/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link.js';
import React, { useEffect, useState } from 'react';
import {
  FaBirthdayCake,
  FaComment,
  FaFacebook,
  FaMedal,
  FaShare,
} from 'react-icons/fa';

import Item from '../components/Item.js';
import imaimport from '../../public/images/imagenfondo.jpg';
import imagenfondo from '../../public/images/logo.png';
export default function Index({ products, affiliates }) {
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);
  return (
    <div class='pl-6'>
      {/* First Part */}
      <link
        rel='stylesheet'
        href='https://unpkg.com/swiper/swiper-bundle.min.css'
      />
      <div class=' m-[-5%] h-[90vh] flex-col justify-center gap-3 md:m-[-2%] md:flex-row'>
        <div class="w-[100vw]] grid  h-[50vh] items-center justify-center bg-[url('../../public/images/menu.jpg')] bg-cover bg-center bg-no-repeat  text-center md:h-[60vh]">
          <Image
            class='ml-[10%] h-[35vh] w-[35vh] md:ml-[20%]'
            src={imagenfondo}
            alt='imagen de un check'
          />
          <h1 class='text-8xl text-white md:text-9xl'>Ecolecta</h1>
        </div>
        <div class='mt-3 flex flex-col gap-4 p-4 md:items-center md:justify-center'>
          <button class='h-10 w-1/2 rounded-lg bg-[#A3E635] pl-5 pr-5 text-base text-black md:hidden '>
            Informate
          </button>
          <div class='h-0 bg-gradient-to-r from-prymary to-[#7af33e] md:mt-[-2%] md:h-[5vh] md:w-[80vw] md:rounded-full' />
          <p className='text-justify text-base md:mt-[2%] md:text-xl'>
            Nostros somos una compañia de recojos de compostaje, donde nuestra
            mision es de ayudar al planeta tierra y mas a usted que quiere
            ayudar a conseguir nuestro objetivo
          </p>
          <button class=' hidden h-10 w-auto rounded-lg bg-[#A3E635] pl-5 pr-5 text-base text-black md:block '>
            Informate
          </button>
        </div>
      </div>
      {dataUser.type === 'admin' ? (
        <div>
          <div className='flex items-center justify-center text-center'>
            <Link
              href='/affiliate/list'
              className=' h-16 rounded-full bg-green-500 text-2xl text-black md:p-2'
            >
              Afiliados
            </Link>
            <Link
              href='/register/user/list'
              className='ml-4 h-16 rounded-full bg-green-500 text-2xl text-black md:p-2'
            >
              Lista de clientes
            </Link>
            <Link
              href='/register/truck/list'
              className='ml-4 h-16 rounded-full bg-green-500 text-2xl text-black md:p-2'
            >
              Lista de Camiones
            </Link>
            <Link
              href='/register/collector/list'
              className='ml-4 h-16 rounded-full bg-green-500 text-2xl text-black md:p-2'
            >
              Lista de Recolectores
            </Link>
          </div>
        </div>
      ) : null}
      {/* Pasos */}
      {/* Afiliados */}
      <div class='h-full min-h-screen flex-row items-center justify-center gap-5 md:flex md:h-auto md:flex-col md:items-center'>
        <div className='flex flex-row'>
          <h1 className='text-primary md:mt-0'>Eco</h1>
          <h1 className='text-prymary2 md:mt-0'>Afiliados</h1>
        </div>
        <div
          id='default-carousel'
          class='grid-cols grid grid-flow-col items-center gap-5 self-center md:w-3/4 '
          data-carousel='slide'
        >
          <div class='grid grid-flow-row grid-cols-1 items-center gap-5 self-center md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 '>
            {affiliates.length > 0
              ? affiliates.map((item) => (
                  <div
                    className='mt-2 flex h-[25vh] flex-col items-center justify-center gap-2 rounded-lg bg-[#EDE595]'
                    key={item.id}
                  >
                    <img
                      className='h-[150px] w-[150px] rounded-full p-1  '
                      src={item.images}
                      width={100}
                      height={100}
                      alt={item.name}
                    />
                    <h3 className='text-black'>{item.name}</h3>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      {/* Bonus */}
      <div class='background-image2 flex h-screen flex-col items-center justify-center gap-4 p-4'>
        <div className='flex w-full flex-col items-start justify-start gap-5'>
          <h1 class='  rounded-lg bg-white p-2 text-[40px] text-green-900'>
            Inicia y Gana
          </h1>
          <p className='text-[20px] text-black'>
            Por completar estas actividades gana puntos que podras intercambiar
            por productos
          </p>
        </div>
        <div class='grid grid-flow-row grid-cols-2 gap-10 text-center'>
          <div class='flex flex-col items-center justify-center gap-2 rounded-lg bg-white '>
            <FaBirthdayCake className='h-full w-full p-2 md:h-[200px] md:w-[300px]' />
            <p class='w-full rounded-lg bg-[#3EFF00] text-xl text-black'>
              Por Cumpleaños
            </p>
          </div>
          <div class='flex flex-col items-center justify-center gap-2 rounded-lg bg-white'>
            <FaShare className='h-full w-full p-2 md:h-[200px] md:w-[300px]' />
            <p class='w-full rounded-lg bg-[#3EFF00] text-xl text-black'>
              Por Comapartir
            </p>
          </div>
          <div class='flex flex-col items-center justify-center gap-2 rounded-lg bg-white'>
            <FaFacebook className='h-full w-full p-2 md:h-[200px] md:w-[300px]' />
            <p class='w-full rounded-lg bg-[#3EFF00] text-xl text-black'>
              Por Seguir
            </p>
          </div>

          <div class='flex flex-col items-center justify-center gap-2 rounded-lg bg-white'>
            <FaComment className='h-full w-full p-2 md:h-[200px] md:w-[300px]' />
            <p class='w-full rounded-lg bg-[#3EFF00] text-xl text-black'>
              Por Comentar
            </p>
          </div>
        </div>
      </div>
      {/* Cambio de productos */}
      <div class='background-plantas flex h-full min-h-screen flex-col justify-center gap-5 p-2'>
        <h1 class=' w-auto rounded-lg bg-green-500 p-2 text-black md:w-[50vh]'>
          CAMBIO DE PUNTOS
        </h1>
        <p className='text-base text-white'>
          Cambia los puntos por nuestros fabulosos productos
        </p>
        <div className='grid grid-flow-col grid-rows-1 overflow-x-auto'>
          {products.length > 0
            ? products.map((value) => (
                <div className='h-full w-96' key={value.id}>
                  <Item data={value} key={value.id} />
                </div>
              ))
            : null}
        </div>
      </div>
      {/* Mas sobre nosotros */}
      <div class='background-plantas mb-5 flex h-full min-h-screen  flex-col gap-5 '>
        <div className='w-full p-2 text-start'>
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
      <div class='background-plantas flex h-full  min-h-[75vh]  flex-col gap-5 p-2'>
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

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/affiliates`);
  const products = await res.json();
  const affiliates = await res2.json();
  return {
    props: {
      products,
      affiliates,
    },
  };
};
