import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '/src/context/authContext';

export default function ListCollects() {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [collects, setCollects] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para el indicador de carga

  useEffect(() => {
    const getCollects = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collects?userId=${userData.idUser}`
      );
      setCollects(data);
      setLoading(false);
    };
    getCollects();
  }, [userData.idUser]);

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
            onClick={() => router.push('/collect/new')}
          >
            Crear recolección
          </button>
        </div>
      )}
    </div>
  );
}
