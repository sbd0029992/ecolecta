/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Point(props) {
  const { handleSubmit, setValue } = useForm();
  const { name, images, price, _id } = props.data;
  const [dataUser, setdataUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);

  const onSubmit = async () => {
    // Adapta la URL y los datos al formato requerido por tu backend
    await axios.post('/api/cart/points', {
      user: dataUser.idUser,
      point: _id,
      quantity: 1,
    });
    setValue('quantity', 1);
  };

  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <h3 className='mt-4 rounded-lg bg-blue-300 p-2 text-white'>{name}</h3>
        <img
          src={images}
          alt='juguete'
          height={200}
          width={200}
          className='rounded-lg'
        />
        <h3 className='rounded-lg bg-white p-2 text-black'>
          {price} Puntos Unidad
        </h3>
      </div>
      <div className='ml-[5%] flex flex-col items-center gap-3'>
        <button
          className='rounded-2xl bg-[#37F989] p-3 text-2xl'
          onClick={handleSubmit(onSubmit)}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}

export default Point;
