/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Item(props) {
  const { register, handleSubmit, setValue } = useForm();
  const [userDetails, setUserDetails] = useState(null);
  const { nameproduct, images, price_points, _id } = props.data;
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  const getUser = async () => {
    try {
      if (!dataUser) {
        console.log('sin susaurio');
        return;
      } else {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${dataUser.idUser}`
        );
        const user = data.user;
        setUserDetails(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async (data) => {
    // Adapta la URL y los datos al formato requerido por tu backend
    await axios.post('/api/cart/products', {
      user: dataUser.idUser,
      product: _id,
      quantity: data.quantity,
    });
    toast.success('Producto agregado con exitoso!');
    setValue('quantity', 1);
  };
  if (!userDetails) {
    return null;
  }
  return (
    <div className=' flex flex-row items-center justify-center text-center xl:ml-[20vh] 2xl:ml-[30vh]'>
      <div className=' flex flex-col items-center gap-3'>
        <h3 className='h-10 w-[30vh] rounded-full bg-green-600 text-white '>
          {nameproduct}
        </h3>
        <img
          src={images}
          alt='juguete'
          height={200}
          width={200}
          className='rounded-lg'
        />
        <h3 className='text-white'>{price_points} Puntos Unidad</h3>
      </div>
      {dataUser.isLoggedIn ? (
        <>
          {userDetails.status === 'completed' && (
            <div className='flex flex-col items-center gap-3 rounded-lg bg-white/40'>
              <button
                className='rounded-2xl bg-green-500 p-3 text-2xl'
                onClick={handleSubmit(onSubmit)}
              >
                Añadir
              </button>

              <h3 className='text-white'>Cantidad</h3>
              <input
                {...register('quantity', { min: 1, max: 10 })}
                type='number'
                defaultValue={1}
                className='font-nameproduct w-20 rounded-2xl bg-white p-1 text-center text-2xl font-bold'
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

export default Item;
