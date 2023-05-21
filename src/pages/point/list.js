/* eslint-disable @next/next/no-img-element */
//import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import withSession from '../../lib/session';
export default function ListProducts({ points }) {
  const router = useRouter();
  const sliderRefs = useRef([]);

  const scrollSlider = (productIndex, direction) => {
    const slider = sliderRefs.current[productIndex];
    const firstImage = slider.children[0];
    const imageWidth = firstImage.clientWidth;
    const marginRight = parseInt(
      window.getComputedStyle(firstImage).getPropertyValue('margin-right')
    );
    const scrollAmount = imageWidth + marginRight;

    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!points) {
    return (
      <div className='text-center'>
        <h1>No hay puntos</h1>
        <div className='mt-4'>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            onClick={() => router.push('/point/new')}
          >
            Crear punto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='background-tierra h-full min-h-[70vh] p-4'>
      <div className='ml-5 text-start'>
        <button
          className='rounded-md bg-green-500 px-4 py-2 text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          onClick={() => router.push('/point/new')}
        >
          Crear punto
        </button>
      </div>
      <div className='container mx-auto flex h-full justify-center  '>
        <div className='my-5 flex flex-row flex-wrap place-content-center gap-5 sm:my-0'>
          {points.map((point, productIndex) => (
            <div
              className='min-w-[200px] overflow-hidden rounded-lg bg-white shadow-xl'
              key={point._id}
            >
              <div className='p-4'>
                <h4 className='text-center text-xl font-semibold'>
                  {point.name}
                </h4>
                <h4 className='text-center text-xl font-semibold'>
                  {point.value}
                </h4>
                <p className='text-gray-600'>{point.description}</p>
                <p className='text-gray-600'>Puntos de precio: {point.price}</p>
                <p className='text-gray-600'>
                  Estado:{' '}
                  <strong
                    className={
                      point.status === 1 ? 'text-primary' : 'text-red-500'
                    }
                  >
                    {point.status === 1 ? 'Disponible' : 'No disponible'}
                  </strong>
                </p>
                <div className='relative m-auto mt-3 h-[100] w-[100px]'>
                  <div
                    className='scroll-snap-type-x flex items-center overflow-auto scrollbar-hide'
                    data-id={productIndex}
                    style={{ scrollSnapType: 'x mandatory' }}
                    ref={(el) => (sliderRefs.current[productIndex] = el)}
                  >
                    {point.images.map((image) => (
                      <div
                        key={image}
                        className='mr-4 flex-none'
                        style={{ width: '100px' }}
                      >
                        <img
                          src={image}
                          alt={point.name}
                          className='h-full w-full rounded-md object-cover shadow-md'
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                  {point.images.length > 1 && (
                    <div className='absolute top-1/2 left-0 flex w-full -translate-y-1/2 transform justify-between'>
                      <button
                        className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                        onClick={() => scrollSlider(productIndex, 'left')}
                      >
                        {'<'}
                      </button>
                      <button
                        className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                        onClick={() => scrollSlider(productIndex, 'right')}
                      >
                        {'>'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='mb-4 flex justify-center'>
                <button
                  className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                  onClick={() => router.push(`/point/${point._id}`)}
                >
                  Ver
                </button>
                <button
                  className='text-redte focus:outline-nred focus:ring-opacred-50 ml-4 rounded-md bg-red-500 px-4 py-2 hover:bg-red-600 focus:ring-2 focus:ring-red-500'
                  onClick={() => router.push(`/point/${point._id}/edit`)}
                >
                  Editar
                </button>
              </div>
            </div>
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
    if (userData.type !== 'admin') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Realiza la solicitud a '/api/points'
    const res = await fetch(`${apiUrl}/api/points`);
    const points = await res.json();

    return {
      props: {
        points,
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
