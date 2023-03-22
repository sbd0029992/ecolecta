import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

function Profile() {
  return (
    <div className='h-screen bg-black'>
      <div className='flex h-screen flex-col items-center justify-center gap-4 p-5'>
        <BsFillTriangleFill className='h-10 w-10 text-red-500 md:hidden' />
        <div className='flex flex-col items-center gap-3 md:hidden'>
          <h1 className='text-primary'> Jhon Pool</h1>
          <div className='h-28 w-28 bg-white'></div>
          <h1 className='text-primary'>POOL@GMAIL.COM</h1>
        </div>
        <div className='flex w-96 flex-col items-center gap-4 rounded-3xl bg-secondary pt-4 pb-4 sm:w-[400px] md:h-[400px] md:w-[800px] md:flex-row lg:w-[900px]'>
          <div className='flex w-96 flex-col items-center gap-5 sm:w-[400px] md:w-3/4'>
            <div className='flex h-full w-5/6 justify-between gap-5 rounded-3xl bg-gray-300 p-5'>
              <div className='mr-14 '>
                <h2>PUNTOS</h2>
              </div>
              <div>
                <h2>2000</h2>
              </div>
            </div>
            <div className='flex w-5/6 justify-between rounded-3xl bg-gray-300 p-5'>
              <div className='mr-14 '>
                <h2>BALDES</h2>
              </div>
              <div>
                <h2>20</h2>
              </div>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <input type='checkbox' value='' class='peer sr-only' />
                <div class="peer h-12 w-20 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-10 after:w-10 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
              <h1 className='text-white'>Tabla Posicion</h1>
            </div>
          </div>
          <div className='mr-5 hidden flex-col items-center md:flex'>
            <BsFillTriangleFill className='mb-5 h-10 w-10 text-red-500' />
            <div className='flex flex-col items-center gap-8'>
              <h1 className='text-white'> Jhon Pool</h1>
              <div className='h-28 w-28 bg-white'></div>
              <h1 className='text-white'>POOL@GMAIL.COM</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
