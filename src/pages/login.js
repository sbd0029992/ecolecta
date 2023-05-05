import Link from 'next/link';
import React from 'react';

function login() {
  return (
    <div className='background-plantas flex h-[100vh] w-full items-center justify-center  pb-10'>
      <div className='m-2  h-[65vh] w-[50vh] rounded-lg bg-white text-center sm:w-[50vh] md:w-[60vh]'>
        <div
          className=' min-[320px]: h-[50px] w-full  rounded-full bg-[#6ecf42] text-center text-sm font-medium text-black hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4
                focus:ring-blue-300 dark:bg-[#6ecf42] dark:hover:bg-green-500 dark:focus:ring-green-500'
        >
          <h2 className='mt-8'>ACCEDER A SU CUENTA</h2>
        </div>
        <form>
          <div className='mt-6 ml-5'>
            <label
              id='email'
              className='mb-2 block text-left text-lg font-medium text-gray-900 dark:text-black '
            >
              Nombre de Usuario
            </label>
            <input
              type='email'
              id='email'
              className='focus:border-black-500 dark:placeholder-black-400   ml-5 block w-[30vh] justify-center rounded-lg border border-gray-300 bg-green-200 p-2.5
                text-sm text-gray-900 focus:ring-black dark:border-gray-600 dark:bg-green-200 dark:text-black dark:focus:border-black dark:focus:ring-black
                  sm:w-[40vh] md:w-[50vh]'
              placeholder='name@flowbite.com'
              required
            />
          </div>
          <div className='mt-6 ml-5'>
            <label
              id='password'
              className='mb-2 block text-left text-lg font-medium text-gray-900 dark:text-black'
            >
              Contraseña
            </label>
            <input
              type='password'
              id='password'
              className='ml-5 block w-[30vh] rounded-lg border border-green-200 bg-green-200
                p-2.5 text-sm text-gray-900 focus:border-black dark:border-black dark:bg-green-200 dark:text-black dark:placeholder-black dark:focus:border-black
                  dark:focus:ring-black sm:w-[40vh] md:w-[50vh]'
              placeholder='Contraseña'
              required
            />

            <div className='mt-10 ml-2   text-left'>
              <Link href='/recuperar' className=' underline decoration-black '>
                Olvide mi contraseña
              </Link>
            </div>
          </div>
          <br />
          <div className='flex h-10 items-center justify-center text-center'>
            <Link
              href='/register'
              id='remember'
              className=' text-md rounded-lg bg-green-500 p-2 font-medium text-black underline decoration-black hover:file:underline dark:text-black'
            >
              NO TENGO CUENTA
            </Link>
          </div>
          <br />
          <button
            type='submit'
            className=' min-[320px]: h-[50px] w-full  bg-[#6ecf42]
                p-2 text-center text-sm font-medium text-white hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4 focus:ring-blue-300
                dark:bg-[#6ecf42] dark:hover:bg-green-500 dark:focus:ring-green-500'
          >
            <Link href='/home'>Acceder</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
export default login;
