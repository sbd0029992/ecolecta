import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import imagenfondo from '../../public/images/logo.png';
function Footer() {
  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);

  return (
    <div className='h- flex w-full flex-row items-center justify-evenly gap-5 bg-green-900 p-6 pb-4 md:h-[20vh] md:max-h-[25vh]'>
      <div className='flex h-[20vh] flex-row gap-4 md:gap-20'>
        <div className='collapse ml-[-10vh] flex flex-col items-center justify-center md:visible md:ml-1'>
          <Image
            src={imagenfondo}
            alt='Logo ecolecta'
            className='rounded-lg'
            width={100}
            height={100}
          />
          <h1 className='text-white'>Ecolecta</h1>
        </div>
        <div className='flex flex-col gap-1'>
          <h4 className=' text-white md:text-sm'>Company</h4>
          <Link href='/blog' className='text-sm text-white md:text-[12px]'>
            Conoce más...
          </Link>
          <Link href='/contact' className='text-sm text-white md:text-[12px]'>
            Contacto
          </Link>
        </div>
        {dataUser.isLoggedIn ? (
          <div className='flex flex-col gap-1'>
            <h4 className='text-white md:text-sm'>PRODUCTS</h4>
            <Link
              href='/product/tienda'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Tienda Productos
            </Link>
            <Link
              href='/product/carrito'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Carrito Productos
            </Link>
          </div>
        ) : null}
        {dataUser.isLoggedIn ? (
          <div className='flex flex-col gap-1'>
            <h4 className='text-white md:text-sm'>POINTS</h4>

            <Link
              href='/point/tienda'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Tienda Puntos
            </Link>
            <Link
              href='/point/carrito'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Carrito Puntos
            </Link>
          </div>
        ) : null}

        {dataUser.type === 'admin' ? (
          <div className='hidden flex-col md:flex'>
            <h4 className='text-white md:text-sm'>ADMINISTRACION</h4>
            <Link
              href='/affiliate/list'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Afiliados
            </Link>
            <Link
              href='/product/list'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Productos
            </Link>
            <Link
              href='/point/list'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Puntos
            </Link>
            <Link
              href='/register/user/photoList'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Comprobante Usuario
            </Link>
            <Link
              href='/point/listSend'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Comprobante Puntos
            </Link>
          </div>
        ) : null}
        {dataUser.type === 'collector' || dataUser.type === 'admin' ? (
          <div className='hidden flex-col md:flex'>
            <h4 className='text-white md:text-sm'>RECOLECTOR</h4>
            {dataUser.type === 'admin' ? (
              <Link
                href='/register/collector/list'
                passHref
                className='text-sm text-white md:text-[12px]'
              >
                Recolectores
              </Link>
            ) : null}
            <Link
              href='/register/truck/list'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Camiones
            </Link>
          </div>
        ) : null}
      </div>
      {/* <div className='flex w-min flex-col gap-2'>
        <h1 className='text-xl text-white'>Ecolecta</h1>
        <p className='text-white md:text-sm '>Recibe noticias</p>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            className='w-20 rounded-md border-2 border-black bg-white p-1'
          />
          <button className='rounded-md bg-white p-1 text-tertiary'>
            Enviar
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Footer;
