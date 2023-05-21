/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

const CarritoCheck = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [dataUser, setdataUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');

      if (data) {
        if (
          data.type !== 'admin' &&
          data.type !== 'user_normal' &&
          data.type !== 'user_superior'
        ) {
          router.push('/');
          return;
        }
      } else {
        router.push('/');
        return;
      }

      setdataUser(data);
    };
    getUser();
  }, [router]);

  const getCartItems = useCallback(async () => {
    if (dataUser) {
      try {
        const { data } = await axios.get('/api/cart/products', {
          params: {
            userId: dataUser.idUser,
          },
        });
        setCartItems(data);
      } catch (error) {
        console.error('There was an error retrieving the cart items', error);
      }
    }
  }, [dataUser]); // dataUser es la dependencia

  useEffect(() => {
    getCartItems();
  }, [getCartItems]); // Ahora getCartItems solo cambiará cuando dataUser cambie

  function sumarPuntos(array) {
    let totalPuntos = 0;
    for (let i = 0; i < array.length; i++) {
      totalPuntos +=
        parseInt(array[i].product.price_points) * array[i].quantity;
    }
    return totalPuntos;
  }

  async function handleRemove(cartId) {
    try {
      await axios.delete(`/api/cart/products/${cartId}`);
      getCartItems();
    } catch (error) {
      console.error(error);
    }
  }

  const userPoints = cartItems[0]?.user.points;
  const totalPuntos = sumarPuntos(cartItems);
  const canConfirm = userPoints >= totalPuntos;
  return (
    <div className='background-image1 h-full min-h-[70vh]'>
      <div className='flex flex-col'>
        <div className='flex justify-end'>
          <div className='m-5 rounded-2xl bg-white p-2'>
            <h1 className=' text-lg'>MIS PUNTOS: {userPoints}</h1>
          </div>
        </div>
        <div>
          <div className='flex justify-center text-white'>
            <table className='w-3/4 table-auto  rounded-lg bg-white text-black lg:w-[800px]'>
              <thead className='rounded-lg bg-green-200'>
                <tr>
                  <th className='px-4 py-2 text-center'></th>
                  <th className='px-4 py-2 text-center'>PRODUCTO</th>
                  <th className='px-4 py-2 text-center'>CANTIDAD</th>
                  <th className='px-4 py-2 text-center'>PUNTOS</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className='flex  place-content-center border px-4 py-2 text-center'>
                      <div className='flex flex-col justify-center  gap-2'>
                        <img
                          src={item.product.images}
                          className='h-20 w-14 rounded-lg sm:h-32 sm:w-20 lg:h-40 lg:w-32 '
                          width={100}
                          height={100}
                          alt='Product Iamge'
                        />
                        <button
                          className='rounded-lg bg-red-500 lg:h-9'
                          onClick={() => handleRemove(item._id)}
                        >
                          Quitar
                        </button>
                      </div>
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.product.nameproduct}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.quantity}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.product.price_points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-5 flex flex-col gap-4'>
            <div className='text-center text-white'>
              <h2>Total Puntos: {totalPuntos} </h2>
            </div>
            <div className='mb-[5%] text-center'>
              <button
                className={`h-12 w-40 rounded-2xl text-xl text-white ${
                  canConfirm ? 'bg-[#33C16F]' : 'bg-gray-500'
                }`}
                disabled={!canConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCheck;
