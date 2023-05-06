import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import withSession from '../../../lib/session';

function ListCollects({ user }) {
  const router = useRouter();
  const [collects, setCollects] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para el indicador de carga

  useEffect(() => {
    const getCollects = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collects?userId=${user.idUser}`
      );
      setCollects(data);
      setLoading(false);
    };
    getCollects();
  }, [router, user.idUser]);

  return (
    <div className='h-full min-h-[70vh] px-6'>
      {loading ? ( // Comprueba si la aplicación está cargando los datos
        <div className='flex h-full min-h-[70vh] items-center justify-center'>
          <div className='loader'></div>
        </div>
      ) : collects.length > 0 ? (
        <div className='container mx-auto h-full min-h-[70vh] py-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {collects.map((collect) => (
              <div
                className='max-w-[250px] rounded p-4 text-black shadow-xl'
                key={collect._id}
              >
                <div>
                  <h4 className='text-lg font-semibold'>
                    Description: {collect.description}
                  </h4>
                  <h4 className='text-sm font-medium'>
                    Status: {collect.status === 1 ? 'Mandado' : 'Aceptado'}
                  </h4>
                </div>
                <div className='mb-4 flex justify-center'>
                  <button
                    className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                    onClick={() => router.push(`/collect/user/${collect._id}`)}
                  >
                    Ver
                  </button>
                  <button
                    className='ml-4 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
                    onClick={() =>
                      router.push(`/collect/user/${collect._id}/edit`)
                    }
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            onClick={() => router.push('/collect/user/new')}
          >
            Crear recolección
          </button>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  return {
    props: {
      user: req.session.get('user'),
    },
  };
});

export default ListCollects;
