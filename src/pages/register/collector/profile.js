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
            <h5 className='text-white'>{userData.email}</h5>
            <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <button
                  className='w-28 rounded-lg bg-red-500 p-2 text-white'
                  onClick={() =>
                    router.push(`/register/collector/${userData.idUser}/edit`)
                  }
                >
                  EDITAR
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
