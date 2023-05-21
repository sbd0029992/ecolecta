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
        const { data } = await axios.get('/api/cart/points', {
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

  async function handleRemove(cartId) {
    try {
      await axios.delete(`/api/cart/points/${cartId}`);
      getCartItems();
    } catch (error) {
      console.error(error);
    }
  }

  const userPoints = cartItems[0]?.user.points;
  return (
    <div className='background-image1 h-full min-h-[70vh] '>
      <div className='flex flex-col '>
        <div className='flex justify-end'>
          <div className='m-5 rounded-2xl bg-white p-2'>
            <h1 className='text-lg'>MIS PUNTOS: {userPoints}</h1>
          </div>
        </div>
        <div>
          <div className='flex justify-center  text-white'>
            <table className='w-3/4 table-auto rounded-lg bg-white text-black lg:w-[800px]'>
              <thead className='bg-green-200'>
                <tr>
                  <th className='px-4 py-2 text-center'></th>
                  <th className='px-4 py-2 text-center'>PUNTOS</th>
                  <th className='px-4 py-2 text-center'>CANTIDAD</th>
                  <th className='px-4 py-2 text-center'>PRECIO</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className='flex  place-content-center border px-4 py-2 text-center'>
                      <div className='flex flex-col justify-center  gap-2'>
                        <img
                          src={item.point.images}
                          className='h-20 w-14 sm:h-32 sm:w-20 lg:h-40 lg:w-32'
                          width={100}
                          height={100}
                          alt='Point Image'
                        />
                        {item.images.length > 0 ? (
                          (() => {
                            if (item.status === 1) {
                              return (
                                <p className='text-green-400'>A la espera...</p>
                              );
                            } else if (item.status === 2) {
                              return <p>Verificado</p>;
                            } else if (item.status === 3) {
                              return <p className='text-red-500'>Rechazado</p>;
                            }
                          })()
                        ) : (
                          <button
                            className='rounded-lg bg-red-500 lg:h-9'
                            onClick={() => handleRemove(item._id)}
                          >
                            QUITAR
                          </button>
                        )}
                        <button
                          className='rounded-lg bg-blue-500 lg:h-9'
                          onClick={() =>
                            router.push(`/point/${item._id}/verify`)
                          }
                        >
                          {item.images.length > 0 ? 'EDITAR' : 'VERIFICAR'}
                        </button>
                      </div>
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.point.name}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.quantity}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {item.point.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCheck;
