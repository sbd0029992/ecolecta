import Image from 'next/image';
import React from 'react';

function Itemuserlist(props) {
  const { valdes, nombre, image } = props.data;
  return (
    <div class='mt-[20px] flex items-center rounded-xl bg-white p-[10px] md:ml-[-3%] md:w-full md:bg-opacity-0 '>
      <Image
        class=' h-[0px] w-[0px] rounded-full bg-black hover:h-full hover:w-full hover:rounded-none md:mr-[5%] md:h-[30px] md:w-[50px]'
        src={image}
        alt='imagen de un check'
      />
      <label class='text-2xl md:text-[0px]'>{valdes} </label>
      <label class='ml-[5px] mr-[5px] text-2xl md:ml-[0px] md:mr-[0px] md:text-[0px]'></label>
      <label class='mr-[5px] rounded-lg text-2xl md:mr-[5%] md:w-[200px] md:bg-white md:pl-[2%] md:text-[15px]'>
        {nombre}{' '}
      </label>
      <div class='h-[25px] w-[25px] rounded-full bg-[#3bf027] md:mr-[5%] lg:w-[150px]'></div>
      <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#5aa646] text-[0px] md:mr-[5%] md:w-auto md:rounded-lg md:text-[15px] '>
        Aceptar
      </button>
      <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#ff0505] text-[0px] md:w-auto md:rounded-lg md:text-[15px]'>
        Denegar
      </button>
    </div>
  );
}

export default Itemuserlist;
