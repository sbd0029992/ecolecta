import React from 'react';

import Item from '/src/components/Item';

export default function TiendaProductos({ products }) {
  if (!products) {
    return (
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white'>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className='h-full min-h-[70vh] bg-black'>
      <div className='flex flex-col p-3'>
        <div className='flex justify-end'></div>
        <div className='grid grid-flow-row items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((value) => (
            <Item data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};