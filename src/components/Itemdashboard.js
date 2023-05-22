import Image from 'next/image';
import React from 'react';

function Itemdashboard(props) {
  const { nombre, quees, puntos, imagen } = props.data;
  return (
    <div class='ml-[30px] mt-[20px] mr-[30px] flex rounded-lg bg-primary bg-opacity-40 md:ml-[20%] md:w-[400px] lg:ml-[30%] xl:ml-[35%]'>
      <div>
        <div class='ml-[20px] mt-[10px] flex'>
          <Image
            class='mt-[10px] h-[70px] w-[70px] rounded-full  bg-black'
            src={imagen}
            alt='imagen de un check'
          />
          <div class='ml-[20px] mt-[10px]'>
            <p class='text-2xl font-bold text-white'>{nombre}</p>
            <p class='text-2xl font-bold text-white'>{quees}</p>
          </div>
        </div>
        <div class='ml-[20px] flex'>
          <label class='ml-[50px] text-2xl font-bold text-white'>PUNTOS</label>
          <label class='ml-[50px] text-2xl font-bold text-white'>
            {puntos}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Itemdashboard;
