import React from 'react';

function login() {
  return (
    <div className='flex h-[100vh]  w-full items-center justify-center bg-blue-200'>
      <section className='h-[min-content] justify-center bg-white p-2  min-[320px]:h-[600px] min-[320px]:w-[400px]'>
        <div className=' flex-justify-center h-auto w-full p-2'>
          <div className='display snap-center  p-1'>
            <br />
            <h1 className='text-2xl font-extrabold text-black'>
              Inicio de sesion
            </h1>
            <br />
            <h5>Acceda a su cuenta</h5>
          </div>
          <br />
          <div className='mb-2 p-1'>
            <form>
              <div className='mb-3'>
                <label
                  id='email'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                >
                  Nombre de Usuario
                </label>
                <input
                  type='email'
                  id='email'
                  className='focus:border-black-500 block w-full rounded-lg border border-gray-300 bg-gray-50
                p-2.5 text-sm text-gray-900 focus:ring-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400
                  dark:focus:border-black dark:focus:ring-black'
                  placeholder='name@flowbite.com'
                  required
                />
              </div>
              <div className='mb-6'>
                <label
                  id='password'
                  className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                >
                  Contraseña
                </label>
                <input
                  type='password'
                  id='password'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 
                p-2.5 text-sm text-gray-900 focus:border-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-black
                  dark:focus:ring-black'
                  placeholder='Contraseña'
                  required
                />

                <div className='mt-3 snap-center'>
                  <a href='' className='rounded-lg underline decoration-black '>
                    Olvide mi contraseña
                  </a>
                </div>
              </div>
              <br />
              <div className='justify-center text-center'>
                <a
                  href='home'
                  id='remember'
                  className=' text-sm font-medium text-black underline decoration-black hover:file:underline dark:text-black'
                >
                  No tengo cuenta
                </a>
              </div>
              <br />
              <button
                type='submit'
                className=' h-[50px] w-full bg-[#85A547]  text-center
              text-sm font-medium text-white hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-[#85A547] dark:hover:bg-green-500
                dark:focus:ring-green-500 '
              >
                Acceder
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
export default login;
