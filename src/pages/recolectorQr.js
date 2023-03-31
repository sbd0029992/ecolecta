import Image from 'next/image';
import React from 'react';

import imaimport from '../../public/images/imagenfondo.jpg';

function Recolector_Qr() {
  let nombre = 'Jhon Pool Magne Rojas ';
  return (
    <div class='h-full min-h-[70vh] bg-secondary pt-5 pb-5 md:pt-0 md:pb-0'>
      <div class='min-h-[70vh] grid-cols-2 place-items-center items-center sm:items-center md:flex md:place-content-center lg:flex-row '>
        <div class='m-auto h-[150px] w-auto rounded-3xl bg-white pt-[15px] md:m-0 md:h-[350px] md:w-[400px]'>
          <div class='flex h-auto w-auto flex-row place-content-center gap-2 '>
            <div>
              <label class=' text-lg'> Recolector:</label>
            </div>
            <div>
              <label class=' text-lg'> {nombre}</label>
            </div>
          </div>
          <div class='flex h-[0px] w-[0px] place-content-center md:w-auto'>
            <label class='invisible md:visible'>Placa: 2005AKS</label>
          </div>
          <div class='flex h-auto w-auto place-content-center'>
            <Image
              class='mt-[20px] h-[70px] w-[70px] rounded-full md:mt-[50px] md:h-[180px] md:w-[180px]'
              src={imaimport}
              alt='imagen de un check'
            />
          </div>
        </div>
        <label class='mt-[10px] mb-[10px] grid h-auto w-auto place-content-center text-4xl text-white md:invisible'>
          QR
        </label>
        <div class='m-auto flex h-auto w-auto flex-col place-content-center gap-3 rounded-3xl bg-white p-5 pb-[20px] md:m-0 md:h-auto md:w-auto'>
          <div class='flex flex-col items-center gap-2'>
            <label class=' text-xl'> Escanea el codigo QR</label>
          </div>
          <div class='flex justify-center'>
            <Image
              class=' h-[200px] w-[200px] '
              src={imaimport}
              alt='imagen de un check'
            />
          </div>
          <div class='flex flex-col items-center gap-2'>
            <button class=' h-[30px] w-[200px] rounded-3xl bg-[#3bf027] text-xl text-white'>
              {' '}
            </button>
            <button class=' h-[30px] w-[200px] rounded-3xl bg-[#3bf027] text-xl text-white'>
              {' '}
              Comprobante{' '}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recolector_Qr;
