import Image from 'next/image';
import React from 'react';

import imaimport from '../../public/images/imagenfondo.jpg';

function Recolector_Qr() {
  let nombre = 'Jhon Pool Magne Rojas ';
  return (
    <div class='h-full min-h-screen bg-[#4D7C0F]'>
      <div class='min-h-screen grid-cols-2 place-items-center items-center sm:items-center md:flex md:place-content-center lg:flex-row '>
        <div class='m-auto h-[200px] w-[500px] rounded-3xl bg-white pt-[15px] md:m-0 md:h-[450px] md:w-[350px]'>
          <div class='flex h-auto w-auto place-content-center'>
            <label class=' text-xl'> Recolector :</label>
            <label class=' ml-[10px] text-xl'> {nombre}</label>
          </div>
          <div class='flex h-[0px] w-[0px] place-content-center md:w-auto'>
            <label class='invisible md:visible'>Placa: 2005AKS</label>
          </div>
          <div class='flex h-auto w-auto place-content-center'>
            <Image
              class='mt-[20px] h-[100px] w-[100px] rounded-full md:mt-[50px] md:h-[150px] md:w-[150px]'
              src={imaimport}
              alt='imagen de un check'
            />
          </div>
        </div>
        <label class='mt-[20px] mb-[20px] grid h-auto w-auto place-content-center text-4xl text-white md:invisible'>
          QR
        </label>
        <div class='m-auto grid h-auto w-[500px] place-content-center rounded-3xl bg-white pb-[20px] md:m-0 md:h-[450px] md:w-[350px]'>
          <label class=' text-xl'> Escanea el codigo QR</label>
          <Image
            class=' mt-[20px] h-[200px] w-[200px] '
            src={imaimport}
            alt='imagen de un check'
          />
          <button class=' mt-[20px] h-[50px] w-[200px] rounded-3xl bg-[#3bf027] text-xl text-white'>
            {' '}
          </button>
          <button class=' mt-[20px] h-[50px] w-[200px] rounded-3xl bg-[#3bf027] text-xl text-white'>
            {' '}
            Comprobante{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recolector_Qr;
