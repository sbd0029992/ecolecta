import Link from 'next/link';
import React from 'react';
function Footer() {
  return (
    <div className='flex h-[20vh] flex-row  items-center justify-evenly gap-5 bg-emerald-900 pl-5 pr-5 md:h-[20vh] md:max-h-[25vh] '>
      <div className='flex flex-row gap-5 md:gap-20'>
        <div className='flex flex-col gap-1'>
          <h4 className=' text-white md:text-sm'>Company</h4>
          <a href='#' className='text-sm text-white md:text-[12px]'>
            About
          </a>
          <a href='#' className='text-sm text-white md:text-[12px]'>
            Careers
          </a>
          <p className='text-transparent'>Blog</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h4 className='text-white md:text-sm'>Product</h4>
          <Link
            href='tiendaProductos'
            className='text-sm text-white md:text-[12px]'
          >
            Tienda
          </Link>
          <Link
            href='carritoCheck'
            className='text-sm text-white md:text-[12px]'
          >
            Carrito
          </Link>
          <a href='#' className='text-sm text-white md:text-[12px]'>
            Hogar
          </a>
        </div>
        <div className='hidden flex-col gap-1 md:flex'>
          <h4 className='text-white md:text-sm'>Points</h4>
          <Link
            href='/tiendaPuntos'
            className='text-sm text-white md:text-[12px]'
          >
            Tienda
          </Link>

          <p className='text-transparent'>Blog</p>
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
