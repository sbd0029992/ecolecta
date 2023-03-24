import Image from 'next/image';
import React from 'react';

import imaimport from '../../public/images/imagenfondo.jpg';
function prueba() {
  return (
    <div class='container mx-auto'>
      <h2 class='mb-4 text-2xl font-bold'>Lista de usuarios</h2>
      <ul class='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        <li class='rounded-lg bg-white p-4 shadow-md'>
          <Image
            class='mx-auto mb-4 h-20 w-20 rounded-full'
            src={imaimport}
            alt='Avatar'
          />
          <h3 class='mb-2 text-lg font-bold'>Nombre del usuario</h3>
          <p class='text-gray-700'>Correo electrónico: correo@ejemplo.com</p>
        </li>
        <li class='rounded-lg bg-white p-4 shadow-md'>
          <Image
            class='mx-auto mb-4 h-20 w-20 rounded-full'
            src={imaimport}
            alt='Avatar'
          />
          <h3 class='mb-2 text-lg font-bold'>Nombre del usuario</h3>
          <p class='text-gray-700'>Correo electrónico: correo@ejemplo.com</p>
        </li>
        <li class='rounded-lg bg-white p-4 shadow-md'>
          <Image
            class='mx-auto mb-4 h-20 w-20 rounded-full'
            src={imaimport}
            alt='Avatar'
          />
          <h3 class='mb-2 text-lg font-bold'>Nombre del usuario</h3>
          <p class='text-gray-700'>Correo electrónico: correo@ejemplo.com</p>
        </li>
        <li class='rounded-lg bg-white p-4 shadow-md'>
          <Image
            class='mx-auto mb-4 h-20 w-20 rounded-full'
            src={imaimport}
            alt='Avatar'
          />
          <h3 class='mb-2 text-lg font-bold'>Nombre del usuario</h3>
          <p class='text-gray-700'>Correo electrónico: correo@ejemplo.com</p>
        </li>
      </ul>
    </div>
  );
}

export default prueba;
