import React from 'react';

import Point from '../components/Point';

function TiendaPuntos() {
  const values = [
    {
      id: '1',
      title: 'Qr de 100',
      image: '/images/qr.jpg',
      points: '50',
    },
    {
      id: '2',
      title: 'Qr de 300',
      image: '/images/qr.jpg',
      points: '100',
    },
    {
      id: '3',
      title: 'Qr de 500',
      image: '/images/qr.jpg',
      points: '200',
    },
  ];
  return (
    <div className='h-full min-h-[70vh] bg-black'>
      <div className='flex flex-col p-3'>
        <div className='grid grid-flow-row items-center justify-center sm:grid-cols-2 lg:grid-cols-3'>
          {values.map((value) => (
            <Point data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TiendaPuntos;
