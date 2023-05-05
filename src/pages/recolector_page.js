import Link from 'next/link';
import React from 'react';

import List from '../components/list';

function recolector_page() {
  const values = [
    {
      id: '1',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '2',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
    {
      id: '3',
      quantity: '20 L',
      user: 'Juan Perez',
    },
  ];
  return (
    <div className='h-full min-h-[70vh] justify-center bg-blue-200 marker:flex xl:flex '>
      <section className='xl:content-flex flex-nowrap items-center justify-center p-2 text-center xl:h-full'>
        <div className=' xl:content mt-6 flex-col rounded-t border-black bg-white p-5 xl:h-[100px] xl:w-[1000px]'>
          <div className='justify -center container flex  flex-wrap min-[1250px]:text-left xl:w-[400px]'>
            <h1 className='text-center'>Lista de recojos listos</h1>
          </div>
          <br></br>
          <div className='justify-center  text-center'>
            <label className='h-auto w-auto rounded-lg bg-[#85A547] p-1 text-white xl:hidden'>
              Usuarios
            </label>
          </div>
        </div>
        <br className='xl:hidden' />
        <div className='flex flex-wrap bg-white  min-[320px]:rounded-lg xl:w-[1000px] xl:rounded-none'>
          <div className='content flex-left flex text-left min-[320px]:ml-8 lg:ml-40 min-[1250px]:ml-60 xl:ml-20'>
            <h4 className=''>Cantidad</h4>
          </div>
          <div className='text-center min-[320px]:ml-12 lg:ml-60 min-[1250px]:ml-80 xl:ml-60'>
            <h4 className=''>Usuario</h4>
          </div>
          <div className='text-right min-[320px]:ml-12 lg:ml-60 min-[1250px]:ml-80'>
            <h4 className=''>Estado</h4>
          </div>
        </div>
        <br className='xl:hidden' />
        <div className='flex flex-wrap rounded-lg bg-white sm:h-[50px] xl:h-full xl:w-[1000px]'>
          {values.map((value) => (
            <List data={value} key={value.id} />
          ))}
        </div>
        <br />
        <div className='content flex h-[50px] w-full flex-nowrap items-center justify-center rounded-lg bg-white xl:mt-2'>
          <button className='h-10 w-[200px] rounded-lg bg-prymary font-primary text-white xl:w-[200px]'>
            Aceptar
          </button>
          <button className='ml-4 h-10 w-[200px] rounded-lg bg-[#FF7272] font-primary text-white xl:visible xl:w-[200px] '>
            <Link href='/home'>Regresar</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default recolector_page;
