import Image from 'next/image';
import user from 'public/images/User.png';
import React from 'react';

function UserCheck() {
  return (
    <div className='background-image2 justify-cente flex h-auto w-auto items-center min-[320px]:h-[100vh] lg:w-full  min-[1250px]:h-full  xl:h-full xl:w-full xl:pb-[11vh]'>
      <div className=' h-auto w-[650px] justify-center marker:flex lg:w-full xl:h-auto xl:w-auto '>
        <section className='ml-10 h-[min-content] w-[320px] items-center justify-center lg:flex lg:w-full lg:flex-nowrap xl:ml-10 xl:flex xl:w-full xl:flex-nowrap'>
          <div className='mt-6 w-[350px] rounded-lg border-black bg-gradient-to-b from-black to-lime-400 p-5 lg:h-[500px] xl:h-[500px]'>
            <div className='container flex flex-wrap p-2'>
              <div className='rounded-t-lg lg:w-full lg:bg-black xl:bg-black '>
                <h3 className='lg:text-center lg:text-white xl:flex xl:justify-center xl:text-center'>
                  RECOLECTOR
                </h3>
              </div>
              <div className='ml-[10px] flex w-[300px] justify-center rounded-full bg-green-400  min-[320px]:invisible min-[320px]:h-[0px]  lg:visible lg:ml-8 lg:h-[250px] lg:w-[250px]  xl:visible xl:h-[250px]'>
                <Image
                  className='justify-center min-[320px]:invisible lg:visible xl:visible'
                  src={user}
                  width={500}
                  height={500}
                  alt='Image Recolector'
                />
              </div>
              <div className='flex items-center justify-center text-center'>
                <label
                  id='lbl_user_employee'
                  className=' items-center justify-center text-center text-lg font-medium'
                >
                  JUAN PEREZ
                </label>
              </div>
              <button
                data-collapse-toggle='navbar-default'
                type='button'
                className=' ml-14 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
                aria-controls='navbar-default'
                aria-expanded='false'
              ></button>
            </div>
            <br />
            <div className='container flex flex-wrap p-1'>
              <h6>PLACA </h6>
              <label id='plate_truck' className='ml-40 text-[12px]'>
                1240DFK
              </label>
            </div>
            <div className='container flex flex-wrap p-1'>
              <h6>ESTADO DE RECORRIDO</h6>
              <label id='status_cruck' className='ml-4 text-[11px]'>
                EN CAMINO
              </label>
            </div>
            <div className='container flex flex-wrap p-1'>
              <h6>TIEMPO DE LLEGADA</h6>
              <label id='clock' className='ml-10 text-[11pz]'>
                120
              </label>
              <h6 className='ml-1'>seg.</h6>
            </div>
            <br />
          </div>
          <br />
          <div className=' backdrop-saturate-125 mt-6 h-auto w-[350px] rounded-lg bg-gradient-to-b from-black to-green-900 lg:ml-20 lg:h-[550px] lg:w-[350px] xl:ml-20 xl:h-[550px]'>
            <div>
              <h2 id='user_name' className='mt-2 text-center text-amber-300'>
                MARCELA PEREZ
              </h2>
            </div>
            <div className='ml-[10px] flex w-[300px] justify-center rounded-full bg-green-400  min-[320px]:invisible min-[320px]:h-[0px]  lg:visible lg:ml-[6vh] lg:h-[250px] lg:w-[250px]  xl:visible xl:h-[300px]'>
              <Image
                className='justify-center min-[320px]:invisible lg:visible xl:visible'
                src={user}
                width={500}
                height={500}
                alt='Image Recolector'
              />
            </div>
            <div className='flex flex-wrap'>
              <h4 className='ml-6 text-white'>Cantidad de baldes :</h4>
              <label
                id='quantity'
                className='ml-5 h-[30px] w-[50px] rounded-lg bg-green-500 p-1 text-center text-[20px]'
              >
                2
              </label>
            </div>
            <div>
              <h6 className='ml-7  text-[17px] text-green-200'>Descripcion:</h6>
              <textarea
                id='description'
                className='ml-10 h-[100px] w-[80%] rounded-lg border border-black text-left text-black'
                placeholder='Esbribir aqui'
              ></textarea>
            </div>
            <div className='jujstify-center ml-[25%] mt-6'>
              <button
                id='btnSend'
                type='submit'
                className='h-[6vh] w-[70%] rounded-full bg-green-400 text-white'
              >
                ENVIAR
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default UserCheck;
