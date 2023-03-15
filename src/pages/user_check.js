import Image from 'next/image';
import image_check from 'public/images/check.png';
import React from 'react';

function user_check() {
  return (
    <div>
      <div className='h-full justify-center bg-blue-200 marker:flex'>
        <section className='justify-center p-2'>
          <div className=' mt-6 rounded-b-lg border-black bg-white p-5'>
            <div className='container flex flex-wrap'>
              <h3>Recolector: </h3>
              <label
                id='lbl_user_employee'
                className=' ml-5 text-lg font-medium'
              >
                Juan Perez
              </label>
              <button
                data-collapse-toggle='navbar-default'
                type='button'
                class=' ml-14 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
                aria-controls='navbar-default'
                aria-expanded='false'
              >
                <span class='sr-only'>Open main menu</span>
                <svg
                  class='h-6 w-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='container flex flex-wrap p-1'>
              <h6>Estado de vehiculo</h6>
              <label id='status_cruck' className='ml-12 text-[11px]'>
                EN CAMINO
              </label>
              <ellipse
                id='status_ellipse'
                className='ml-5 w-5 rounded-full bg-green-500'
              ></ellipse>
            </div>
            <div className='container flex flex-wrap p-1'>
              <h6>Tiempo estimado llegada</h6>
              <label id='clock' className='ml-2 text-[11pz]'>
                120{' '}
              </label>
              <h6 className='ml-1'>seg.</h6>
            </div>
          </div>
          <div className='backdrop-saturate-125 mt-8 h-[540px] w-[345px] rounded-lg bg-white/50'>
            <div>
              <h2 id='user_name' className='p-5 text-white'>
                Braian Canelas
              </h2>
            </div>
            <div className='flex flex-wrap'>
              <h4 className='ml-6 text-white'>Cantidad de baldes :</h4>
              <label
                id='quantity'
                className='ml-5 h-[30px] w-[50px] rounded-lg bg-white p-1 text-center text-[20px]'
              >
                2
              </label>
            </div>
            <div>
              <h4 className='ml-7 mt-5 text-[17px] text-white'>Descripcion:</h4>
              <textarea
                id='description'
                className='ml-10 mt-6 h-[100px] w-[80%] rounded-lg border border-black text-left text-black'
                placeholder='Esbribir aqui'
              ></textarea>
            </div>
            <div className='ml-[25%] mt-6'>
              <button
                id='btnSend'
                type='submit'
                className='h-[190px] w-[70%] rounded-full bg-[#85A547]'
              >
                <Image
                  width={24}
                  height={24}
                  className='ml-10 h-24 w-24 align-middle'
                  src={image_check}
                  alt='imagen de un check'
                />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default user_check;
