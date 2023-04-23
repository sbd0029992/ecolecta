import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductDetail({ truck, error }) {
  const { query, push } = useRouter();

  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const deleteProduct = async () => {
    try {
      await fetch(`/api/trucks/${query.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProduct();
      closeModal();
      push('/register/truck/list');
    } catch (error) {
      console.log(error);
    }
  };

  if (!truck) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <p className='text-gray-800'>
          {error || 'No se encontraron datos para este camión.'}{' '}
        </p>
      </div>
    );
  }

  return (
    <div className='h-full min-h-[70vh]'>
      <div className='ml-5 text-start'>
        <button
          className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={() => push('/register/truck/list')}
        >
          Lista de camiones
        </button>
      </div>
      <div className='flex h-full flex-col items-center justify-center'>
        {isLoading && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-100'></div>
          </div>
        )}
        <div className='min-w-min py-5 shadow-2xl'>
          <h1 className='text-center text-3xl font-bold '>Camion</h1>

          <div className='p-6'>
            <p className='mb-2 font-medium text-gray-600'>
              Placa: {truck.plate}
            </p>
            <p className='mb-2 font-medium text-gray-600'>
              Chasis: {truck.chasis}
            </p>
            <p className='mb-2 font-medium text-gray-600'>
              Modelo: {truck.model}
            </p>
            <p className='mb-2 font-medium text-gray-600'>
              Marca: {truck.brand}
            </p>
            <p className='font-medium text-gray-600'>
              Estado:
              <strong
                className={`ml-2 font-medium ${
                  truck.status === 1 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {truck.status === 1 ? 'Disponible' : 'No disponible'}
              </strong>
            </p>
          </div>
          <div className='text-center'>
            <button
              className=' rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </div>

        {confirm && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
              <p className='mb-4 text-lg'>
                Are you sure you want to delete this truck?
              </p>
              <div className='flex justify-end'>
                <button
                  className='mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/trucks/${params.id}`);

  if (!res.ok) {
    console.error('Error fetching truck data:', res.statusText);
    return {
      props: {
        truck: null,
        error: 'Failed to fetch truck data',
      },
    };
  }

  const { truck } = await res.json();
  return {
    props: {
      truck,
    },
  };
}
