/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const ListaComprados = () => {
  const [cartItems, setCartItems] = useState([]);
  const [dataUser, setdataUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);

  const getCartItems = useCallback(async () => {
    if (dataUser) {
      try {
        const { data } = await axios.get('/api/cart/products/cart', {
          params: {
            userId: dataUser.idUser,
            status: 2, // Solo obtiene productos con status == 2
          },
        });
        setCartItems(data);
      } catch (error) {
        console.error('There was an error retrieving the cart items', error);
      }
    }
  }, [dataUser]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  const filteredItems = cartItems.filter((item) =>
    (
      item.user.firstName +
      ' ' +
      item.user.lastName +
      ' ' +
      item.user.secondLastName
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleComplete = async (itemId) => {
    try {
      await axios.put(`/api/cart/products/${itemId}`, {
        status: 3,
      });
      getCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='background-image1 h-full min-h-[70vh] '>
      {/* Barra de búsqueda */}
      <input
        className='m-4 w-[35vh] rounded-lg bg-white text-black'
        type='text'
        placeholder='Buscar por nombre de usuario...'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col '>
        <div className='flex justify-center text-white'>
          <table className='w-3/4 table-auto  rounded-lg bg-white text-black lg:w-[800px]'>
            <thead>
              <tr>
                <th className='px-4 py-2 text-center'></th>
                <th className='px-4 py-2 text-center'>USUARIO</th>
                <th className='px-4 py-2 text-center'>PRODUCTO</th>
                <th className='px-4 py-2 text-center'>CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className='flex  place-content-center border px-4 py-2 text-center'>
                    <div className='flex flex-col justify-center  gap-2'>
                      <img
                        src={item.product.images}
                        className='h-20 w-14 sm:h-32 sm:w-20 lg:h-40 lg:w-32'
                        width={100}
                        height={100}
                        alt='Product Image'
                      />
                      <button
                        className='rounded-lg bg-green-500 lg:h-9'
                        onClick={() => handleComplete(item._id)}
                      >
                        Completado
                      </button>
                    </div>
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    <div className='flex flex-col justify-center gap-2'>
                      <p>
                        {item.user.firstName +
                          ' ' +
                          item.user.lastName +
                          ' ' +
                          item.user?.secondLastName}
                      </p>
                      <a
                        className='rounded-full bg-blue-400 text-white hover:text-blue-600'
                        href={`https://www.google.com/maps?q=${item.user?.location.latitude},${item.user?.location.longitude}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Ver en Google Maps
                      </a>
                    </div>
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    {item.product.nameproduct}
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaComprados;
