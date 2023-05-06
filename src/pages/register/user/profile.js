import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';

import { AuthContext } from '/src/context/authContext';

function Profile() {
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
        <Link href='/verify_user'>
          <BsFillTriangleFill className='h-10 w-10 text-red-500 md:hidden' />
        </Link>
        <div className='flex flex-col items-center gap-3 md:hidden'>
          <h1 className='text-primary'>{fullName}</h1>
          <button
            onClick={() =>
              router.push(`/register/user/${userData.idUser}/edit`)
            }
            className='w-40 rounded-3xl bg-primary p-2 text-white'
          >
            Editar Perfil
          </button>
          <h1 className='text-primary'>{userData.email}</h1>
        </div>
        <div className='flex w-96 flex-col items-center gap-4 rounded-3xl bg-secondary pt-4 pb-4 sm:w-[400px] md:h-[370px] md:w-[800px] md:flex-row lg:w-[900px]'>
          <div className='flex w-96 flex-col items-center gap-5 sm:w-[400px] md:w-3/4'>
            <div className='flex h-full w-5/6 justify-between gap-5 rounded-3xl bg-gray-300 p-5'>
              <div className='mr-14 '>
                <h2>PUNTOS</h2>
              </div>
              <div>
                <h2>{userDetails.points}</h2>
              </div>
            </div>
            <div className='flex w-5/6 justify-between rounded-3xl bg-gray-300 p-5'>
              <div className='mr-14 '>
                <h2>BALDES</h2>
              </div>
              <div>
                <h2>{userDetails.buckets}</h2>
              </div>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <input type='checkbox' value='' class='peer sr-only' />
                <div class="peer h-11 w-20 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-10 after:w-10 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
              <h1 className='text-white'>Tabla Posicion</h1>
            </div>
          </div>
          <div className='mr-5 hidden flex-col items-center md:flex'>
            <Link href='/verify_user'>
              <BsFillTriangleFill className='mb-5 h-10 w-10 text-red-500' />
            </Link>
            <div className='flex flex-col items-center gap-8'>
              <h1 className='text-white'>{fullName}</h1>
              <button
                onClick={() =>
                  router.push(`/register/user/${userData.idUser}/edit`)
                }
                className='w-40 rounded-3xl bg-primary p-2 text-white'
              >
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
