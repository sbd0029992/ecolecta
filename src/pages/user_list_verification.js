import React from 'react';

import Point from '../components/Itemuserlist';
import imaimport from '../../public/images/check.png';
function user_list_verification() {
  const values = [
    {
      id: '1',
      nombre: 'joaquin Aguilar Rojas',
      valdes: '20',
      image: imaimport,
    },
    {
      id: '2',
      nombre: 'Diego Salvatierra',
      valdes: '20',
      image: imaimport,
    },
    {
      id: '1',
      nombre: 'joaquin Aguilar Rojas',
      valdes: '20',
      image: imaimport,
    },
  ];
  return (
    <div class='h-full min-h-screen bg-[#4D7C0F]'>
      <div class='mb-[20px] h-auto w-auto rounded-b-3xl bg-white pt-[15px] pb-[25px] md:h-[0px] md:w-[0px]'>
        <button class='md:ml[0px md:mr[0px] md:text[0px] ml-[390px] mr-[25px] md:collapse md:h-[0px]'>
          {' '}
          |||{' '}
        </button>
        <div class='flex h-auto w-auto place-content-center'>
          <label class=' text-2xl md:text-[0px]'>
            {' '}
            Lista de usuarios listos
          </label>
        </div>
        <div class='mt-[50px] flex h-auto w-auto place-content-center md:h-[0px] md:w-[0px]'>
          <label class='grid h-[25px] w-[100px] place-content-center rounded-3xl bg-[#6a8d3e] text-white md:text-[0px]'>
            Usuarios
          </label>
        </div>
      </div>
      <div class='rounded-xl bg-[#dbdbdb] bg-opacity-0 md:ml-[5%] md:mr-[5%] md:bg-opacity-100 md:p-[5%]'>
        <label class='text-[0px] md:text-[20px] '>Lista de Usuarios</label>
        <div class='flex'>
          <label class='mr-[0px] text-[0px] md:mr-[5%] md:w-[50px] md:text-[15px]'>
            Imagen
          </label>
          <label class='mr-[0px] text-[0px] md:mr-[5%] md:w-[200px] md:text-[15px]'>
            Nombres de usuario
          </label>
          <label class='mr-[0px] text-[0px] md:mr-[5%] md:w-[200px] md:text-[15px]'>
            Listo para la revicion
          </label>
        </div>
        <div class=' grid w-auto place-content-center p-2'>
          {/*aqui va el ciclo infinito*/}
          {values.map((value) => (
            <Point data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default user_list_verification;
