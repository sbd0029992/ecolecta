import React from 'react';

function RegisterTruck() {
  return (
    <div className='flex justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1 className='font-title font-semibold'>Register Truck</h1>
        <form style={{ fontFamily: 'Karla, sans-serif' }}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                NOMBRE PROPIETARIO
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='John'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                MARCA
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='PEPE'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                MODELO
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='John'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                AÑO DE FABRICA
              </label>
              <input
                type='number'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='10101010'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                NUMERO DE SERIE
              </label>
              <input
                type='number'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='10101010'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                MATRICULA
              </label>
              <input
                type='number'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='70707070'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                SOAD
              </label>
              <input
                type='email'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='000000'
                required
              />
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                class='m-[0px] h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-xl font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                Registrar
              </button>{' '}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterTruck;
