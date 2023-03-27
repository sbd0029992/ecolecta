import React from 'react';

function Footer() {
  return (
    <div className='flex h-[25vh] flex-row items-center justify-evenly gap-5 bg-tertiary pl-5 pr-5'>
      <div className='flex flex-row gap-5 md:gap-20'>
        <div className='flex flex-col gap-1'>
          <h4 className='text-white'>Company</h4>
          <a href='#' className='text-white'>
            About
          </a>
          <a href='#' className='text-white'>
            Careers
          </a>
          <p className='text-transparent'>Blog</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h4 className='text-white'>Product</h4>
          <a href='#' className='text-white'>
            Puntos
          </a>
          <a href='#' className='text-white'>
            Electricos
          </a>
          <a href='#' className='text-white'>
            Hogar
          </a>
        </div>
        <div className='hidden flex-col gap-1 md:flex'>
          <h4 className='text-white'>Product</h4>
          <a href='#' className='text-white'>
            Puntos
          </a>
          <a href='#' className='text-white'>
            Electricos
          </a>
          <a href='#' className='text-white'>
            Hogar
          </a>
        </div>
      </div>
      <div className='flex w-min flex-col gap-2'>
        <h1 className='text-white'>Ecolecta</h1>
        <p className='text-white '>Recibe noticias</p>
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
