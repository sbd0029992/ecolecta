/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '/src/context/authContext';

export default function Profile() {
  const router = useRouter();
  const { userData } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState(null);
  const fullName = `${userData.firstName} ${userData.lastName}${
    userData.secondLastName ? ' ' + userData.secondLastName : ''
  }`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData.idUser}`
        );
        setUserDetails(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    if (userData && userData.idUser) {
      fetchUserData();
    }
  }, [userData]);

  if (!userDetails) {
    return (
      <div>
        <div className='flex h-screen items-center justify-center'>
          <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
          <div className='flex flex-col items-center gap-5'>
            <h1 className='text-white'>Cargando...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black'>
      <div className='flex h-full min-h-[70vh]  flex-col items-center justify-center gap-4 p-5 '>
        <div className='flex flex-col items-center gap-3 md:hidden'>
          <h1 className='text-primary'>{fullName}</h1>
          {userDetails.photos.map((image) => (
            <div
              key={image}
              className='mr-4 flex-none '
              style={{ width: '100px' }}
            >
              <img
                src={image}
                alt={userDetails.name}
                className='h-full w-full rounded-md object-cover shadow-md'
                width={100}
                height={100}
              />
            </div>
          ))}
          <h1 className='text-primary'>{userData.email}</h1>
        </div>
        <div className='flex w-96 flex-col items-center gap-4 rounded-3xl bg-secondary pt-4 pb-4 sm:w-[400px] md:h-[370px] md:w-[800px] md:flex-row lg:w-[900px]'>
          <div className='flex w-96 flex-col items-center gap-5 sm:w-[400px] md:w-3/4'>
            <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <button
                  className='w-28 rounded-lg bg-slate-900 p-2 text-white'
                  onClick={() =>
                    router.push(`/register/collector/${userData.idUser}/edit`)
                  }
                >
                  Editar
                </button>
              </label>
              <h1 className='text-white'>Editar Datos</h1>
            </div>
          </div>
          <div className='mr-5 hidden flex-col items-center md:flex'>
            <div className='flex flex-col items-center gap-8'>
              <h1 className='text-white'> {fullName}</h1>
              {userDetails.photos.map((image) => (
                <div
                  key={image}
                  className='mr-4 flex-none '
                  style={{ width: '100px' }}
                >
                  <img
                    src={image}
                    alt={userDetails.name}
                    className='h-full w-full rounded-md object-cover shadow-md'
                    width={100}
                    height={100}
                  />
                </div>
              ))}{' '}
              <h1 className='text-white'>{userData.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
