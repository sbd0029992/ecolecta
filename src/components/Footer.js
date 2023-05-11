import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className='flex h-[20vh] flex-row  items-center justify-evenly gap-5 bg-tertiary pl-5 pr-5 md:h-[20vh] md:max-h-[25vh] '>
      <div className='flex h-[20vh] flex-row gap-5 md:gap-20'>
        <div className='flex flex-col gap-1'>
          <h4 className=' text-white md:text-sm'>Company</h4>
          <Link href='/blog' className='text-sm text-white md:text-[12px]'>
            passHref About
          </Link>
          <Link href='/contact' className='text-sm text-white md:text-[12px]'>
            passHref Contacto
          </Link>
          <Link
            href='/recolectorQr'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Qr Recolector
          </Link>
        </div>
        <div className='flex flex-col gap-1'>
          <h4 className='text-white md:text-sm'>Product</h4>
          <Link
            href='/product/tienda'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Tienda
          </Link>
          <Link
            href='/product/carrito'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Carrito
          </Link>
          <a href='#' className='text-sm text-white md:text-[12px]'>
            Hogar
          </a>
        </div>
        <div className='hidden flex-col gap-0.5 md:flex'>
          <h4 className='text-white md:text-sm'>Admin</h4>
          <Link
            href='/register/collector/list'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Recolectores
          </Link>
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
            href='/register/truck/list'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Camiones
          </Link>
          <Link
            href='/register/user/photoList'
            passHref
            className='text-sm text-white md:text-[12px]'
          >
            Envio Comprovantes
          </Link>
          <p className='text-transparent'>Blog</p>
        </div>
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
