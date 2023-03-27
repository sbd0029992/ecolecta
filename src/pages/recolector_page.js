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
  ];
  return (
    <div className='h-[100vh] justify-center bg-blue-200 marker:flex xl:flex xl:items-center'>
      <section className='xl:content-flex flex-nowrap items-center justify-center p-2 text-center'>
        <div className=' -lg xl:content mt-6 rounded-t border-black bg-white p-5 xl:h-[100px] xl:w-[1000px]'>
          <div className='container flex flex-wrap min-[1250px]:text-left xl:w-[400px]'>
            <h1 className='text-left'>Lista de recojos listos</h1>
            <div className=' items-right  ml-5 flex'>
              <button
                data-collapse-toggle='navbar-default'
                type='button'
                className=' inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
                aria-controls='navbar-default'
                aria-expanded='false'
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='h-6 w-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <br></br>
          <div className='justify-center  text-center'>
            <label className='h-auto w-auto rounded-lg bg-[#85A547] p-1 text-white xl:hidden'>
              Usuarios
            </label>
          </div>
        </div>
        <br className='xl:hidden' />
        <div className='flex flex-wrap bg-white  min-[320px]:rounded-lg xl:w-[1000px]  xl:rounded-none'>
          <div className='content flex-left flex text-left min-[390px]:ml-12 lg:ml-40 min-[1250px]:ml-60 xl:ml-20'>
            <h4 className=''>Cantidad</h4>
          </div>
          <div className='text-center min-[390px]:ml-12 lg:ml-60 min-[1250px]:ml-80 xl:ml-60'>
            <h4 className=''>Usuario</h4>
          </div>
          <div className='text-right min-[390px]:ml-12 lg:ml-60 min-[1250px]:ml-80'>
            <h4 className=''>Estado</h4>
          </div>
        </div>
        <br className='xl:hidden' />
        <div className=' flex flex-wrap rounded-lg bg-white sm:h-[50px] xl:w-[1000px] '>
          {values.map((value) => (
            <List data={value} key={value.id} />
          ))}
        </div>
        <br />
        <div className='content flex h-[50px] w-full flex-nowrap items-center justify-center rounded-lg bg-white'>
          <button className='h-10 w-[200px] rounded-lg bg-prymary font-primary text-white xl:w-[200px]'>
            Aceptar
          </button>
          <button className='ml-4 h-10 w-[200px] rounded-lg bg-[#FF7272] font-primary text-white xl:visible xl:w-[200px] '>
            Regresar
          </button>
        </div>
      </section>
    </div>
  );
}

export default recolector_page;
