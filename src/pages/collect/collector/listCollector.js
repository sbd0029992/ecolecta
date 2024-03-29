import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import withSession from '../../../lib/session';

function ListCollectCollector() {
  const router = useRouter();
  const [dataUser, setdataUser] = useState([]);
  const [collects, setCollects] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/user');
        setdataUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getCollects = async () => {
      try {
        const { data } = await axios.get(
          `/api/collects/collector/list?userId=${dataUser.idUser}`
        );
        setCollects(data);
      } catch (error) {
        console.error('Error fetching collects:', error);
      }
    };

    if (dataUser.idUser) {
      getCollects();
    }
  }, [dataUser.idUser]);

  return (
    <div className='background-plantas flex h-full min-h-[70vh] flex-col py-5 '>
      <div className='flex flex-col items-center justify-center p-2'>
        <div className='mb-2 flex  rounded-lg bg-green-300 p-4'>
          <h1>Lista de Recojos</h1>
        </div>
        {collects.length > 0 ? (
          <div className='flex flex-wrap rounded-lg bg-white '>
            <table className='w-full table-auto'>
              <thead>
                <tr>
                  <th className='border px-4 py-2'>Cantidad</th>
                  <th className='border px-4 py-2'>Usuario</th>
                  <th className='border px-4 py-2'>Descripcion</th>
                  <th className='border px-4 py-2'>Estado</th>
                </tr>
              </thead>
              <tbody>
                {collects.map((collect) => (
                  <tr key={collect._id}>
                    <td className='border px-4 py-2 text-center'>
                      {collect.user[0].type === 'user_normal'
                        ? collect.buckets * 20 + ' L'
                        : collect.buckets * 200 + ' L'}
                    </td>
                    <td className='flex  flex-col border px-4 py-2 text-center'>
                      {collect.user[0].firstName +
                        ' ' +
                        collect.user[0].lastName +
                        ' ' +
                        collect.user[0].secondLastName}
                      <a
                        className='text-blue-400 hover:text-blue-600'
                        href={`https://www.google.com/maps?q=${collect.user[0].location.latitude},${collect.user[0].location.longitude}`}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Ubicacion
                      </a>
                    </td>
                    <td className='w-[100px] border px-4 py-2 text-center'>
                      {collect.description}
                    </td>
                    <td
                      className='cursor-pointer border px-4 py-2 text-center'
                      onClick={() =>
                        router.push(`/collect/collector/${collect._id}/edit`)
                      }
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full text-center ${
                          collect.status === 1
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      ></span>
                      <p>Aceptar</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='rounded-lg bg-red-300 p-2'>
            <h1>Todavia no hay recojos</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = withSession(async function (context) {
  const { req } = context;
  const user = req.session.get('user');

  // check if user is not logged in
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
    if (userData.type !== 'admin' && userData.type !== 'collector') {
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

export default ListCollectCollector;
