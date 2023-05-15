import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
    <div className='flex h-[20vh] flex-row items-center justify-evenly gap-5 bg-tertiary px-5 md:h-[20vh] md:max-h-[25vh] '>
      <div className='flex h-[20vh] flex-row gap-5 md:gap-20'>
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
        {dataUser.type === 'collector' ||
        dataUser.type === 'admin' ||
        dataUser.type === 'user_superior' ? (
          <div className='hidden flex-col md:flex'>
            <h4 className='text-white md:text-sm'>RECOLECTOR</h4>
            <Link
              href='/register/collector/list'
              passHref
              className='text-sm text-white md:text-[12px]'
            >
              Recolectores
            </Link>

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
      <div className='flex w-min flex-col gap-2'>
        <h1 className='text-xl text-white'>Ecolecta</h1>
        <p className='text-white md:text-sm '>Recibe noticias</p>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            className='w-32 rounded-md border-2 border-white bg-transparent p-1'
          />
          <button className='rounded-md bg-white p-1 text-tertiary'>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
