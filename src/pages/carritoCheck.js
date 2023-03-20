import React from 'react';

const CarritoCheck = () => {
  return (
    <div className='h-screen bg-black'>
      <div className='flex flex-col '>
        <div className='flex justify-end'>
          <div className='m-5 rounded-2xl bg-gray-300 p-2'>
            <h1 className='text-lg'>MIS PUNTOS: 2000</h1>
          </div>
        </div>
        <div>
          <div className='flex justify-center text-white'>
            <table className='table-auto'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-center'></th>
                  <th className='px-4 py-2 text-center'>Producto</th>
                  <th className='px-4 py-2 text-center'>Cantidad</th>
                  <th className='px-4 py-2 text-center'>Puntos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='flex  border px-4 py-2 text-center'>
                    <div className='flex flex-col gap-2'>
                      <div className='h-20 w-14 bg-white'></div>
                      <button className='rounded-lg bg-red-500'>Quitar</button>
                    </div>
                  </td>
                  <td className='border px-4 py-2 text-center'>Baldes</td>
                  <td className='border px-4 py-2 text-center'>2</td>
                  <td className='border px-4 py-2 text-center'>100</td>
                </tr>
                <tr>
                  <td className='flex  border px-4 py-2 text-center'>
                    <div className='flex flex-col gap-2'>
                      <div className='h-20 w-14 bg-white'></div>
                      <button className='rounded-lg bg-red-500'>Quitar</button>
                    </div>
                  </td>
                  <td className='border px-4 py-2 text-center'>Botellas</td>
                  <td className='border px-4 py-2 text-center'>3</td>
                  <td className='border px-4 py-2 text-center'>150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='mt-5 flex flex-col gap-4'>
            <div className='text-center text-white'>
              <h2>Total Puntos: 250</h2>
            </div>
            <div className='text-center'>
              <button className='h-12 w-40 rounded-2xl bg-primary text-xl text-white'>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoCheck;
