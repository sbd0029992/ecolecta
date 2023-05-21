import React from 'react';

import withSession from '../../lib/session';

import Item from '/src/components/Item';
export default function TiendaProductos({ products }) {
  const filterProducts = products.filter((product) => product.status === 1);

  if (!products) {
    return (
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-white'>Cargando...</h1>
      </div>
    );
  }
  return (
    <div className='background-plantas h-full min-h-[70vh] p-8'>
      <div className='flex flex-col p-3'>
        <div className='flex justify-end'></div>
        <div className='grid grid-flow-row items-center justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filterProducts.map((value) => (
            <Item data={value} key={value.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = withSession(async function (context) {
  const { req } = context;
  const user = req.session.get('user');

  // Verifica si el usuario no ha iniciado sesión
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookie = context.req.headers.cookie;

  // Busca los datos del usuario
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  // Si la respuesta es OK, extrae los datos del usuario y verifica su tipo
  if (userRes.ok) {
    const userData = await userRes.json();

    // Comprueba si el usuario tiene el tipo 'admin' o 'collector'
    if (
      userData.type !== 'admin' &&
      userData.type !== 'user_normal' &&
      userData.type !== 'user_superior'
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Realiza la solicitud a '/api/points'
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const products = await res.json();

    return {
      props: {
        products,
        user,
      },
    };
  } else {
    // Si la respuesta no es OK, redirige al usuario a la página de inicio
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});
