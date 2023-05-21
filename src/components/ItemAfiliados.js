/* eslint-disable @next/next/no-img-element */
import React from 'react';

function ItemAfiliados(props) {
  const { name, images, _id } = props.data;

  return (
    <div className=' mt-4 flex h-[25vh] flex-col items-center justify-center gap-2 rounded-lg'>
      <div className=' flex  items-center gap-3'>
        <img
          src={images}
          alt='juguete'
          height={200}
          width={200}
          className='h-[150px] w-[150px] rounded-full p-1 '
        />
        <h3 className='h-10 w-[30vh] text-black '>{name}</h3>
      </div>
    </div>
  );
}

export default ItemAfiliados;
