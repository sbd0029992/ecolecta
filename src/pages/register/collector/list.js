import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

// eslint-disable-next-line unused-imports/no-unused-imports
// import Truck from '/src/models/Truck';
import User from '/src/models/User';
import { dbConnect } from '/src/utils/mongosee';

export default function ListUsers({ users }) {
  const router = useRouter();

  const collectors = users.filter((user) => user.type === 'collector');

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
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>No hay usuarios</h1>
          <div>
            <button
              className='rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
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
    <div className='h-full min-h-[70vh] px-6'>
      <div className='text-start'>
        <button
          className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={() => router.push('/register/truck/new')}
        >
          Registrar Recolector
        </button>
      </div>
      <div className='container mx-auto h-full min-h-[70vh] py-8'>
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
                        <Image
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
                  className='rounded bg-yellow-500 px-3 py-2 font-semibold text-white hover:bg-yellow-600'
                  onClick={() =>
                    router.push(`/register/collector/${user._id}/edit`)
                  }
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

export const getServerSideProps = async () => {
  dbConnect();

  const users = await User.find({}).populate('truck').lean().exec();
  const usersWithConvertedIds = users.map((user) => {
    return {
      ...user,
      _id: user._id.toString(),
      birthdate: user.birthdate.toISOString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      truck: user.truck
        ? {
            _id: user.truck._id.toString(),
            plate: user.truck.plate,
            createdAt: user.truck.createdAt.toISOString(),
            updatedAt: user.truck.updatedAt.toISOString(),
          }
        : null,
    };
  });

  return {
    props: {
      users: usersWithConvertedIds,
    },
  };
};
