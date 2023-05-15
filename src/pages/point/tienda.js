import React from 'react';

import Point from '../../components/Point';

export default function TiendaProductos({ points }) {
  const filterPoints = points.filter((point) => point.status === 1);

  if (!points) {
    return (
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white'>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className='background-plantas h-full min-h-[70vh]'>
      <div className='flex flex-col p-3'>
        <div className='flex justify-end'></div>
        <div className='grid grid-flow-row items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filterPoints.map((value) => (
            <Point data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/points`);
  //filter status = 1

  const points = await res.json();
  return {
    props: {
      points,
    },
  };
};
