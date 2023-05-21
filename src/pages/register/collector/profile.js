/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);

  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUserContext = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUserContext();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    try {
      if (!dataUser) {
        console.log('sin susaurio');
        return;
      } else {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${dataUser.idUser}`
        );
        const user = data.user;
        setUserDetails(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  const fullName = `${dataUser.firstName} ${dataUser.lastName}${
    dataUser.secondLastName ? ' ' + dataUser.secondLastName : ''
  }`;

  if (!userDetails) {
    return (
      <div>
        <div className='flex h-screen items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
          <div className='flex flex-col items-center gap-5'>
            <h1 className='text-white'>Cargando...</h1>
            <h1 className='text-white'>Espere un momento</h1>
            <button
              onClick={async () => {
                getUser();
              }}
              className='w-28 rounded-lg bg-slate-900 p-2 text-white'
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='background-image1 '>
      <div className='flex h-auto min-h-[70vh]  flex-col items-center justify-center gap-4 p-5 '>
        <div className='flex h-[60vh] w-96 flex-col items-center gap-4 rounded-3xl bg-black pt-4 pb-4   md:flex-row '>
          <div className='flex w-full flex-col items-center gap-6'>
            {userDetails.photos.map((image) => (
              <div
                key={image}
                className='mr-4  flex-none'
                style={{ width: '200px' }}
              >
                <img
                  src={image}
                  alt={userDetails.name}
                  className='h-[30vh] w-[100vh] rounded-full bg-white object-cover shadow-md '
                  width={200}
                  height={200}
                />
              </div>
            ))}
            <h4 className='text-amber-300'> {fullName}</h4>
            <h5 className='text-white'>{dataUser.email}</h5>
            <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <button
                  className='w-28 rounded-lg bg-red-500 p-2 text-white'
                  onClick={() =>
                    router.push(`/register/collector/${dataUser.idUser}/edit`)
                  }
                >
                  EDITAR
                </button>
                <button
                  onClick={() =>
                    router.push(`/register/user/${dataUser.idUser}/password`)
                  }
                  className='w-40 rounded-3xl bg-primary p-2 text-white'
                >
                  Cambiar Contraseña
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
