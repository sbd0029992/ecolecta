import Image from 'next/image';
import React from 'react';

import imaimport from '../../public/images/imagenfondo.jpg';

function dashboard() {
  let nombre = 'Jhon Pool Magne Rojas ';
  let nombre1 = 'joaquin Aguilar Rojas';
  let quees1 = 'Beneficiario';
  var puntos1 = 3000;
  var puntos = 500;
  return (
    <div class='h-[100vh] bg-[#4D7C0F]'>
      <div class='w-[500px] md:w-auto lg:w-auto xl:w-auto'>
        <section>
          <div class='flex md:pt-5'>
            <div class='ml-[20px] flex h-auto w-auto rounded-lg bg-[#64748b] md:ml-auto md:mr-[25px]'>
              <div class='mt-[20px] md:mt-0 md:flex md:w-auto'>
                <label class='md:mr-[10px]'>{nombre}</label>
                <div class='flex'>
                  <label class='md:ml-[10px]'> PUNTOS : </label>
                  <label class='md:ml-[10px]'> {puntos}</label>
                </div>
              </div>
              <div class='ml-5 md:ml-[0px]'>
                <Image
                  class='h-[70px] w-[70px] rounded-full  bg-black hover:w-[200px] md:h-0 md:w-0'
                  src={imaimport}
                  alt='imagen de un check'
                />
              </div>
            </div>
            <button class='ml-[200px] md:invisible md:mr-[0px] md:ml-[0px] md:text-2xl md:text-[0px]'>
              {' '}
              |||{' '}
            </button>
          </div>
          <h1 class='ml-[20px] mt-[20px]'> TOP RANK </h1>
          <div class='ml-[30px] mt-[20px] mr-[30px] flex rounded-lg bg-[#b91c1c] bg-opacity-40'>
            <div>
              <div class='ml-[20px] mt-[10px] flex'>
                <Image
                  class='mt-[10px] h-[70px] w-[70px] rounded-full  bg-black hover:w-[200px]'
                  src={imaimport}
                  alt='imagen de un check'
                />
                <div class='ml-[20px] mt-[10px]'>
                  <p class='text-2xl font-bold'>{nombre1}</p>
                  <p class='text-2xl font-bold'>{quees1}</p>
                </div>
              </div>
              <div class='ml-[20px] flex'>
                <label class='ml-[50px] text-2xl font-bold'>PUNTOS</label>
                <label class='ml-[50px] text-2xl font-bold'>{puntos1}</label>
              </div>
            </div>
            <Image
              class='invisible ml-[0px] mr-[0px] h-[0px] w-[0px] md:visible md:ml-auto md:mr-[20px] md:h-auto md:w-[200px]'
              src={imaimport}
              alt='imagen de un check'
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default dashboard;
