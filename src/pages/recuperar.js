import Link from 'next/link';
import React from 'react';

function recuperar() {
  return (
    <div className='flex h-[100vh]  w-full items-center justify-center bg-green-300'>
      <section className='h-[min-content] justify-center rounded-lg bg-white  p-2 min-[320px]:h-auto min-[320px]:w-auto'>
        <div className=' flex-justify-center h-auto w-full p-2'>
          <div className='display snap-center  p-1'>
            <br />
            <h1 className='text-2xl font-extrabold text-black'>
              Recupere su cuenta
            </h1>
            <br />
          </div>
          <br />
          <div className='mb-2 p-1'>
            <form>
              <div className='mb-3'>
                <label
                  id='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                >
                  Correo electronico
                </label>
                <input
                  type='email'
                  id='email'
                  className='focus:border-black-500 block w-full rounded-lg border border-gray-300 bg-green-300
                p-2.5 text-sm text-gray-900 focus:ring-black dark:border-gray-600 dark:bg-green-300 dark:text-black dark:placeholder-gray-400
                  dark:focus:border-black dark:focus:ring-black'
                  placeholder='name@flowbite.com'
                  required
                />
              </div>
              <br />
              <Link href='/login'>
                <button
                  className=' h-[50px] w-full rounded-lg  bg-[#146b3b]
              text-center text-sm font-medium text-white hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-[#137e2e]
                dark:hover:bg-green-500 dark:focus:ring-green-500'
                >
                  MANDAR MENSAJE
                </button>
              </Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default recuperar;
