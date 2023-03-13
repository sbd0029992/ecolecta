import React from 'react';

function login() {
  return (
    <div className='h-full justify-center bg-blue-200 p-11 marker:flex'>
      <section className='b min-h-[650px] justify-center rounded-lg bg-white'>
        <br className='p-10' />
        <div className=' flex-justify-center p-2'>
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
              <div class='mb-3'>
                <label
                  for='email'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                >
                  Nombre de Usuario
                </label>
                <input
                  type='email'
                  id='email'
                  class='focus:border-black-500 block w-full rounded-lg border border-gray-300 bg-gray-50
                p-2.5 text-sm text-gray-900 focus:ring-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400
                  dark:focus:border-black dark:focus:ring-black'
                  placeholder='name@flowbite.com'
                  required
                />
              </div>
              <div class='mb-6'>
                <label
                  for='password'
                  class='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                >
                  Contraseña
                </label>
                <input
                  type='password'
                  id='password'
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 
                p-2.5 text-sm text-gray-900 focus:border-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-black
                  dark:focus:ring-black'
                  placeholder='Contraseña'
                  required
                />

                <div className='snap-center p-8'>
                  <a
                    href=''
                    className='rounded-lg bg-[#85A547] py-2 px-4 underline decoration-black '
                  >
                    Olvide mi contraseña
                  </a>
                </div>
              </div>

              <div class='mb-6 flex items-start'>
                <a
                  href='home'
                  for='remember'
                  class='ml-2 text-sm font-medium text-black underline decoration-black hover:file:underline dark:text-black'
                >
                  No tengo cuena
                </a>
              </div>
              <button
                type='submit'
                class='mr-2 mb-2 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-center
              text-sm font-medium text-white hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-[#85A547] dark:hover:bg-green-500
                dark:focus:ring-green-500 sm:w-auto'
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
//srf tab tab
