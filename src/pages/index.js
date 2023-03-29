import Image from 'next/image';
import React from 'react';
import {
  FaBirthdayCake,
  FaComment,
  FaFacebook,
  FaMedal,
  FaShare,
} from 'react-icons/fa';

import Item from '../components/Item.js';
import imaimport from '../../public/images/imagenfondo.jpg';

function Index() {
  const values = [
    {
      id: '1',
      title: 'Qr de 100',
      image: '/images/juguete.jpg',
      points: '50',
    },
    {
      id: '2',
      title: 'Qr de 300',
      image: '/images/qr.jpg',
      points: '100',
    },
    {
      id: '3',
      title: 'Qr de 500',
      image: '/images/juguete.jpg',
      points: '200',
    },
    {
      id: '4',
      title: 'Juguete',
      image: '/images/juguete.jpg',
      points: '500',
    },
  ];
  return (
    <div class='bg-secondary p-6'>
      {/* First Part */}
      <div class='flex h-[90vh] flex-col justify-center gap-3 md:flex-row'>
        <div class="flex h-[60vh] items-center justify-center bg-[url('../../public/images/bg-kallpalla.png')] bg-cover bg-center bg-no-repeat text-center  md:h-[80vh]  ">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            voluptatum, tempora commodi eligendi sequi re
          </h1>
        </div>
        <div class='mt-3 flex flex-col gap-4 md:items-center md:justify-center'>
          <button class='h-10 w-1/2 rounded-lg bg-[#A3E635] pl-5 pr-5 text-base text-white md:hidden '>
            Informate
          </button>
          <p className='text-justify text-base md:text-xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
            accusamus, eius fugit magni quisquam nihil, tenetur facilis culpa
          </p>

          <button class=' hidden h-10 w-1/2 rounded-lg bg-[#A3E635] pl-5 pr-5 text-base text-white md:block '>
            Informate
          </button>
        </div>
      </div>
      {/* Afiliados */}
      <div class='flex h-full min-h-screen flex-col items-center justify-center gap-5 md:flex md:h-auto md:flex-row md:items-center'>
        <div className='flex flex-col gap-5 md:w-2/4'>
          <h1 class=' text-white md:mt-0 '>Afiliados</h1>
          <p className='text-base text-white'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Consequuntur, fugit. Possimus excepturi officiis labore sapiente
            totam harum
          </p>
        </div>
        <div class='grid grid-flow-row grid-cols-2 items-center gap-5 self-center md:w-3/4 '>
          <Image
            className='h-[200] w-[200px] rounded-full p-1 md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] '
            src='/images/icon-kallpalla-color.png'
            width={100}
            height={100}
            alt='imagen de un check'
          />
          <Image
            className='h-[200] w-[200px] rounded-full p-1 md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]'
            src='/images/icon-kallpalla-color.png'
            width={100}
            height={100}
            alt='imagen de un check'
          />
          <Image
            className='h-[200] w-[200px] rounded-full p-1 md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]'
            src='/images/icon-kallpalla-color.png'
            width={100}
            height={100}
            alt='imagen de un check'
          />
          <Image
            className='h-[200] w-[200px] rounded-full p-1 md:h-[250px] md:w-[250px]  lg:h-[300px] lg:w-[300px]'
            src='/images/icon-kallpalla-color.png'
            width={100}
            height={100}
            alt='imagen de un check'
          />
        </div>
      </div>
      {/* Bonus */}
      <div class='flex h-screen flex-col items-center justify-center gap-6 '>
        <div className='flex w-full flex-col items-start justify-start gap-5'>
          <h1 class='  text-white '>Inicia y Gana</h1>
          <p className='text-base text-white'>
            Por completar estas actividades gana puntos que podras intercambiar
            por productos
          </p>
        </div>
        <div class='grid grid-flow-row grid-cols-2 gap-10 '>
          <div class='flex flex-col items-center justify-center gap-2'>
            <FaBirthdayCake className='h-full w-full md:h-[200px] md:w-[300px]' />
            <p class='text-base text-white'> Por Cumpleaños</p>
          </div>
          <div class='flex flex-col items-center justify-center gap-2'>
            <FaFacebook className='h-full w-full md:h-[200px] md:w-[300px]' />
            <p class='text-base text-white'> Por Compartir</p>
          </div>

          <div class='flex flex-col items-center justify-center gap-2'>
            <FaComment className='h-full w-full md:h-[200px] md:w-[300px]' />
            <p class='text-base text-white'> Por Comentar</p>
          </div>
          <div class='flex flex-col items-center justify-center gap-2'>
            <FaShare className='h-full w-full md:h-[200px] md:w-[300px]' />
            <p class='text-base text-white'> Por Comparit</p>
          </div>
        </div>
      </div>
      {/* Cambio de productos */}
      <div class='flex h-full min-h-screen flex-col justify-center gap-5 '>
        <h1 class=' text-white'>Cambio de puntos</h1>
        <p className='text-base text-white'>
          Cambia los puntos por nuestros fabulosos productos
        </p>
        <div className='grid grid-flow-col grid-rows-1 overflow-x-auto'>
          {values.map((value) => (
            <div className='h-full w-96' key={value.id}>
              <Item data={value} key={value.id} />
            </div>
          ))}
        </div>
      </div>
      {/* Mas sobre nosotros */}
      <div class='mb-5 flex h-full min-h-screen flex-col  gap-5 '>
        <div className='w-full text-start '>
          <h1 class=' text-white'>Mas Sobre Nosotros </h1>
        </div>
        <div className='flex h-[85vh] w-full flex-col gap-5 md:flex-row'>
          <Image
            src={imaimport}
            className='h-full w-full md:w-1/2 '
            alt='imagen de un check'
          />
          <Image
            src={imaimport}
            className='h-full w-full md:w-1/2 '
            alt='imagen de un check'
          />
        </div>
      </div>
      {/* Clubes */}
      <div class='flex h-full min-h-[75vh]  flex-col  gap-5'>
        <h1 class='text-white '>Club</h1>
        <div class='flex flex-col gap-5'>
          <p className='text-base text-white'>
            Unete a nuestros clubes y disfruta sus beneficios!
          </p>
          <div className='grid grid-flow-row grid-cols-2 justify-around gap-3 md:flex md:flex-row'>
            <div className='flex flex-col gap-2'>
              <FaMedal className='h-auto w-40 text-[#cd7f32] lg:w-64' />
              <p className='text-center text-white'>Club Bronce</p>
            </div>
            <div className='flex flex-col gap-2'>
              <FaMedal className='h-auto w-40 text-[#c0c0c0] lg:w-64' />
              <p className='text-center text-white'>Club Plata</p>
            </div>
            <div className='flex flex-col gap-2'>
              <FaMedal className='h-auto w-40 text-[#ffd700] lg:w-64' />
              <p className='text-center text-white'>Club Oro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
