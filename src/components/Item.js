/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

function Item(props) {
  const { nameproduct, images, price_points } = props.data;
  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <h3 className='text-white'>{nameproduct}</h3>
        <img src={images} alt='juguete' height={200} width={200} />
        <h3 className='text-white'>{price_points} Puntos Unidad</h3>
      </div>
      <div className='ml-[5%] flex flex-col items-center gap-3'>
        <Link href='/carritoCheck'>
          <button className='rounded-2xl bg-primary p-3 text-2xl'>
            Añadir
          </button>
        </Link>
        <button className='rounded-2xl bg-red-500 p-3 text-2xl text-white'>
          Quitar
        </button>
        <h3 className='text-white'>Cantidad</h3>
        <input
          type='number'
          min='1'
          max='10'
          className='font-nameproduct w-20 rounded-2xl bg-gray-400 p-1 text-center  text-2xl font-bold'
        />
      </div>
    </div>
  );
}

export default Item;
