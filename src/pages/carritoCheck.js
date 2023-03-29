import Image from 'next/image';
import React from 'react';

const CarritoCheck = () => {
  const values = [
    {
      id: '1',
      title: 'Peluche ',
      image: '/images/juguete.jpg',
      points: '300',
      cantidad: 2,
    },
  ];

  function sumarPuntos(array) {
    let totalPuntos = 0;
    for (let i = 0; i < array.length; i++) {
      totalPuntos += parseInt(array[i].points) * array[i].cantidad;
    }
    return totalPuntos;
  }

  const totalPuntos = sumarPuntos(values);

  return (
    <div className='h-full min-h-[70vh] bg-black '>
      <div className='flex flex-col '>
        <div className='flex justify-end'>
          <div className='m-5 rounded-2xl bg-gray-300 p-2'>
            <h1 className='text-lg'>MIS PUNTOS: 2000</h1>
          </div>
        </div>
        <div>
          <div className='flex justify-center  text-white'>
            <table className='w-3/4 table-auto  lg:w-[800px]'>
              <thead>
                <tr>
                  <th className='px-4 py-2 text-center'></th>
                  <th className='px-4 py-2 text-center'>Producto</th>
                  <th className='px-4 py-2 text-center'>Cantidad</th>
                  <th className='px-4 py-2 text-center'>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {values.map((value) => (
                  <tr key={value.i}>
                    <td className='flex  place-content-center border px-4 py-2 text-center'>
                      <div className='flex flex-col justify-center  gap-2'>
                        <Image
                          src={value.image}
                          className='h-20 w-14 sm:h-32 sm:w-20 lg:h-40 lg:w-32'
                          width={100}
                          height={100}
                          alt='Product Iamge'
                        />
                        <button className='rounded-lg bg-red-500 lg:h-9'>
                          Quitar
                        </button>
                      </div>
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {value.title}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {value.cantidad}
                    </td>
                    <td className='border px-4 py-2 text-center'>
                      {value.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-5 flex flex-col gap-4'>
            <div className='text-center text-white'>
              <h2>Total Puntos: {totalPuntos} </h2>
            </div>
            <div className='mb-[5%] text-center'>
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
