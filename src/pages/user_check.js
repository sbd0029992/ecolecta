import Image from 'next/image';
import Link from 'next/link';
import image_check from 'public/images/check.png';
import React from 'react';

function user_check() {
  return (
    <div className='flex h-auto w-auto items-center justify-center bg-blue-200 min-[320px]:h-[100vh] lg:w-full  min-[1250px]:h-full  xl:pb-[11vh]'>
      <div className=' h-auto w-[650px] justify-center marker:flex lg:w-full xl:h-auto xl:w-auto '>
        <section className='ml-8 h-[min-content] w-[320px] items-center justify-center lg:flex lg:w-full lg:flex-nowrap xl:ml-10 xl:flex xl:w-full xl:flex-nowrap'>
          <div className='mt-6 w-[350px] rounded-lg border-black bg-white p-5 xl:h-[500px]'>
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
                className=' ml-14 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
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
            <br />
            <div className='container flex flex-wrap p-1'>
              <h6>Placa </h6>
              <label id='plate_truck' className='ml-40 text-[12px]'>
                1240DFK
              </label>
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
                120
              </label>
              <h6 className='ml-1'>seg.</h6>
            </div>
            <br />
            <div className='ml-[10px] flex w-[300px] justify-center rounded-full bg-green-400 p-5 min-[320px]:invisible min-[320px]:h-[0px]  lg:visible lg:h-[300px]  xl:visible xl:h-[300px]'>
              <Image
                className='justify-center min-[320px]:invisible lg:visible xl:visible'
                src='/images/user.png'
                width={500}
                height={500}
                alt='Image Recolector'
              />
            </div>
          </div>
          <br />
          <div className=' backdrop-saturate-125 mt-6 h-auto w-[350px] rounded-lg bg-white/50 p-2 lg:ml-20 lg:h-[500px] lg:w-[350px] xl:ml-20 xl:h-[550px]'>
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
            <div className='jujstify-center ml-[25%] mt-6'>
              <button
                id='btnSend'
                type='submit'
                className='h-[190px] w-[70%] rounded-full bg-[#85A547]'
              >
                <Link href='/'>
                  <Image
                    width={24}
                    height={24}
                    className='ml-10 flex h-24 w-24 justify-center'
                    src={image_check}
                    alt='imagen de un check'
                  ></Image>
                </Link>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default user_check;
