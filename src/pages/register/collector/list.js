/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function ListUsers({ collectors }) {
  const router = useRouter();

  const sliderRefs = useRef([]);

  const scrollSlider = (userIndex, direction) => {
    const slider = sliderRefs.current[userIndex];
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

  if (!collectors) {
    return (
      <div className='background-tierra flex min-h-screen flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>No hay usuarios</h1>
          <div>
            <button
              className='rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600'
              onClick={() => router.push('/register')}
            >
              Crear usuario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='background-tierra h-full min-h-[70vh] p-6 px-6 '>
      <div className='text-start'>
        <button
          className=' mb-2 rounded-md bg-green-500 px-4 py-2 text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          onClick={() => router.push('/register/collector/new')}
        >
          REGISTRAR RECOLECTOR
        </button>
      </div>
      <div className='container mx-auto h-full min-h-[70vh] rounded-lg bg-white p-2 py-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {collectors.map((user, userIndex) => (
            <div
              className='max-w-[250px] rounded p-4 text-black shadow-xl'
              key={user._id}
            >
              <div>
                <h4 className='text-lg font-semibold'>
                  {user.firstName} {user.lastName}
                </h4>
                <h4 className='text-sm font-medium'>Usuario: {user.type}</h4>
                <h4 className='text-sm font-medium'>
                  Placa: {user.truck ? user.truck.plate : 'N/A'}
                </h4>
                <div className='relative m-auto h-[100] w-[100px]'>
                  <div
                    className='scroll-snap-type-x flex items-center overflow-auto scrollbar-hide'
                    data-id={userIndex}
                    style={{ scrollSnapType: 'x mandatory' }}
                    ref={(el) => (sliderRefs.current[userIndex] = el)}
                  >
                    {user.photos.map((image) => (
                      <div
                        key={image}
                        className='mr-4 flex-none '
                        style={{ width: '100px' }}
                      >
                        <img
                          src={image}
                          alt={user.name}
                          className='h-full w-full rounded-md object-cover shadow-md'
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>
                  {user.photos.length > 1 && (
                    <div className='absolute top-1/2 left-0 flex w-full -translate-y-1/2 transform justify-between'>
                      <button
                        className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                        onClick={() => scrollSlider(userIndex, 'left')}
                      >
                        {'<'}
                      </button>
                      <button
                        className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                        onClick={() => scrollSlider(userIndex, 'right')}
                      >
                        {'>'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='mt-4 flex justify-center'>
                <button
                  className='rounded bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-600'
                  onClick={() =>
                    router.push(`/register/collector/${user._id}/edit`)
                  }
                >
                  EDITAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/users/collector`);
  const collectors = await res.json();
  return {
    props: {
      collectors,
    },
  };
};
