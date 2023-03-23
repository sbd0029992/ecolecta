import Image from 'next/image';
import React from 'react';

function Item(props) {
  const { title, image, points } = props.data;
  return (
    <div className='flex flex-row items-center justify-center'>
      <div className='flex flex-col items-center gap-3'>
        <h3 className='text-white'>{title}</h3>
        <Image src={image} alt='juguete' height={200} width={200} />
        <h3 className='text-white'>{points} Puntos Unidad</h3>
      </div>
      <div className='ml-[5%] flex flex-col items-center gap-3'>
        <button className='rounded-2xl bg-primary p-3 text-2xl'>Añadir</button>
        <button className='rounded-2xl bg-red-500 p-3 text-2xl text-white'>
          Quitar
        </button>
        <h3 className='text-white'>Cantidad</h3>
        <input
          type='number'
          className='w-20 rounded-2xl bg-gray-400 p-1 text-center font-title  text-2xl font-bold'
        />
      </div>
    </div>
  );
}

export default Item;
