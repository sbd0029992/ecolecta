import React from 'react';

import Item from '../components/Item';

function TiendaProductos() {
  const values = [
    {
      id: '1',
      title: 'Peluche ',
      image: '/images/juguete.jpg',
      points: '300',
    },
    {
      id: '2',
      title: 'Peluche 2',
      image: '/images/juguete.jpg',
      points: '600',
    },
    {
      id: '3',
      title: 'Peluche 3',
      image: '/images/juguete.jpg',
      points: '200',
    },
    {
      id: '4',
      title: 'Peluche 4',
      image: '/images/juguete.jpg',
      points: '800',
    },
  ];
  return (
    <div className='h-full min-h-screen bg-black'>
      <div className='flex flex-col p-3'>
        <div className='flex justify-end'>
          <div className='m-5 rounded-2xl bg-gray-300 p-2'>
            <h1 className='text-lg'>MIS PUNTOS: 2000</h1>
          </div>
        </div>
        <div className='grid grid-flow-row items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {values.map((value) => (
            <Item data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TiendaProductos;
