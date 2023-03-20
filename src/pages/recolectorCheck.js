import React from 'react';
//import green icon react-icons
import { FaCheckCircle } from 'react-icons/fa';

function RecolectorCheck() {
  return (
    <div className='h-screen  bg-black font-secondary'>
      <div className='flex h-screen flex-col items-center justify-center gap-20'>
        <div className='flex w-[90vw] flex-col gap-5 rounded-xl bg-gray-200 p-4'>
          <div className='mb-5 flex'>
            <div className='w-[50vw] self-center'>
              <h2 className='font-medium'>Usuario: </h2>
            </div>
            <div className='min-w-fit self-center'>
              <p>Brian Canelas</p>
            </div>
          </div>
          <div className=' flex'>
            <div className='w-[50vw]'>
              <h3 className='font-normal'>Estado: </h3>
            </div>
            <div className='min-w-fit self-center'>
              <p>Esta Listo</p>
            </div>
            <div>
              <FaCheckCircle className='ml-5 h-7 w-5 text-green-400' />
            </div>
          </div>
          <div className=' flex'>
            <div className='w-[50vw]'>
              <h4 className='font-normal'>Cantidad de baldes: </h4>
            </div>
            <div className='min-w-fit self-center'>
              <p>2 Baldes</p>
            </div>
          </div>
          <div className='flex items-start justify-center'>
            <button className='h-10 w-3/4 rounded-lg bg-red-400 text-lg font-extrabold text-white'>
              PENALIZAR
            </button>
          </div>
        </div>
        <div className='flex w-[90vw] flex-col gap-5 rounded-xl bg-secondary p-4 '>
          <div className='flex justify-between'>
            <button className='h-14 w-[38vw] rounded-xl bg-primary text-2xl font-semibold text-white'>
              Estado
            </button>
            <button className='h-14 w-[38vw] rounded-xl bg-primary text-2xl font-semibold text-white'>
              Ubicacion
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='items-start'>
              <h1 className='font-normal text-white  '>
                Hora estimada de llegada
              </h1>
            </div>
            <div className='flex justify-center'>
              <input
                className='h-14 w-16 text-center text-2xl'
                type='number'
                placeholder='HH'
              />
              <div className='mr-5 ml-5 self-center'>
                <h1 className='m text-white'>:</h1>
              </div>
              <input
                className='h-14 w-16 text-center text-2xl'
                type='number'
                placeholder='MM'
              />
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div>
              <button className='h-14 w-full rounded-xl bg-primary text-3xl font-bold text-white'>
                VAMOS
              </button>
            </div>
            <div>
              <button className='h-14 w-full rounded-xl bg-primary text-3xl font-bold text-white'>
                YA LLEGUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecolectorCheck;
