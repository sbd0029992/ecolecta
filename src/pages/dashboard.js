import Image from 'next/image';
import React from 'react';

import Point from '../components/Itemdashboard';
import imaimport from '../../public/images/imagenfondo.jpg';
function dashboard() {
  let nombre = 'Jhon Pool Magne Rojas ';
  const values = [
    {
      id: '1',
      nombre: 'joaquin Aguilar Rojas',
      quees: 'Beneficiario',
      puntos: '2560',
      imagen: imaimport,
    },
    {
      id: '2',
      nombre: 'joaquin Aguilar Rojas',
      quees: 'Beneficiario',
      puntos: '2560',
      imagen: imaimport,
    },
    {
      id: '3',
      nombre: 'joaquin Aguilar Rojas',
      quees: 'Beneficiario',
      puntos: '2560',
      imagen: imaimport,
    },
  ];
  var puntos = 500;
  return (
    <div class='h-full min-h-[70vh] bg-secondary pb-5 pt-5 md:pt-0'>
      <div class='w-auto md:w-auto lg:w-auto xl:w-auto'>
        <section>
          <div class='flex md:pt-5'>
            <div class='ml-[20px] flex h-auto w-auto rounded-lg bg-[#64748b] md:ml-auto md:mr-[25px]'>
              <div class='mt-[20px] md:mt-0 md:flex md:w-auto'>
                <label class='md:mr-[10px]'>{nombre}</label>
                <div class='flex'>
                  <label class='md:ml-[10px]'> PUNTOS : </label>
                  <label class='md:ml-[10px]'> {puntos}</label>
                </div>
              </div>
              <div class='ml-5 md:ml-[0px]'>
                <Image
                  class='h-[70px] w-[70px] rounded-full  bg-black md:h-0 md:w-0'
                  src={imaimport}
                  alt='imagen de un check'
                />
              </div>
            </div>
          </div>
          <h1 class='ml-[20px] mt-[20px]'> TOP RANK </h1>
          {values.map((value) => (
            <Point data={value} key={value.id} />
          ))}
        </section>
      </div>
    </div>
  );
}

export default dashboard;
