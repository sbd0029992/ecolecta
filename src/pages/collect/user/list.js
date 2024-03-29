import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import withSession from '../../../lib/session';

function ListCollects({ user }) {
  const router = useRouter();
  const [collects, setCollects] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para el indicador de carga
  const [dataUser] = useState([]);
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
    <div className='background-plantas h-full min-h-[70vh] p-6 px-6'>
      {loading ? ( // Comprueba si la aplicación está cargando los datos
        <div className='flex h-full min-h-[70vh] items-center justify-center'>
          <div className='loader'></div>
        </div>
      ) : collects.length > 0 ? (
        <div className='container mx-auto h-full min-h-[70vh] py-8'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {collects.map((collect) => (
              <div className='rounded-lg bg-white' key={collect._id}>
                <div className='max-w-[250px] rounded p-4 text-black shadow-xl'>
                  <div>
                    <h4 className='text-lg font-semibold'>
                      Description: {collect.description}
                    </h4>
                    <h4 className='text-sm font-medium'>
                      Estado: {collect.status === 1 ? 'Mandado' : 'Aceptado'}
                    </h4>
                  </div>
                  <div className='mb-4 flex justify-center'>
                    <button
                      className='mt-2 rounded-md bg-primary px-4 py-2 text-white'
                      onClick={() =>
                        router.push(`/collect/user/${collect._id}/edit`)
                      }
                    >
                      Ver Pedido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            onClick={() => router.push('/collect/user/new')}
          >
            Crear recolección
          </button>
        </div>
      )}
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
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });
  if (userRes.ok) {
    const userData = await userRes.json();

    if (
      userData.type !== 'user_normal' &&
      userData.type !== 'user_superior' &&
      userData.type !== 'admin'
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const res = await fetch(`${apiUrl}/api/collects`);
    const affiliates = await res.json();

    return {
      props: {
        user,
        affiliates,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});
export default ListCollects;
