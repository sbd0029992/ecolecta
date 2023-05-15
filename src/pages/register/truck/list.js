import { useRouter } from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function ListTrucks({ trucks }) {
  const router = useRouter();

  if (!trucks) {
    return (
      <div className='text-center'>
        <h1>No hay camiones</h1>
        <div className='mt-4'>
          <button
            className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            onClick={() => router.push('/register/truck/new')}
          >
            Crear camion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='background-tierra h-full min-h-[70vh] p-4 '>
      <div className='ml-5 text-start'>
        <button
          className='mb-4 rounded-md bg-green-500 px-4 py-2 text-black hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          onClick={() => router.push('/register/truck/new')}
        >
          Crear camion
        </button>
      </div>
      <div className='fle-col container mx-auto flex  h-full w-full justify-center'>
        <div className='my-5 flex flex-row flex-wrap place-content-center gap-5 sm:my-0'>
          {trucks.map((truck) => (
            <div
              className='min-w-[200px] overflow-hidden rounded-lg bg-white shadow-xl'
              key={truck._id}
            >
              <div className='p-4'>
                <h4 className='text-center text-xl font-semibold'>Camion</h4>
                <p className='text-black'>Placa: {truck.plate}</p>
                <p className='text-black'>Chasis: {truck.chasis}</p>
                <p className='text-black'>Año: {truck.model}</p>
                <p className='text-black'>Modelo: {truck.brand}</p>
                <p className='text-black'>
                  Estado:{' '}
                  <strong
                    className={
                      truck.status === 1 ? 'text-green-600' : 'text-red-500'
                    }
                  >
                    {truck.status === 1 ? 'Disponible' : 'No disponible'}
                  </strong>
                </p>
              </div>
              <div className='mb-4 flex justify-center'>
                <button
                  className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                  onClick={() => router.push(`/register/truck/${truck._id}`)}
                >
                  Ver
                </button>
                <button
                  className='ml-4 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                  onClick={() =>
                    router.push(`/register/truck/${truck._id}/edit`)
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
  const res = await fetch(`${apiUrl}/api/trucks`);
  const trucks = await res.json();
  return {
    props: {
      trucks,
    },
  };
};
