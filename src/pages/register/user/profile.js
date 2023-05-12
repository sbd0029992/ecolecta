import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import user from '/public/images/User.png';
import { AuthContext } from '/src/context/authContext';

function Profile() {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  console.log('🚀 ~ file: profile.js:13 ~ Profile ~ userDetails:', userDetails);
  const fullName = `${userData.firstName} ${userData.lastName}${
    userData.secondLastName ? ' ' + userData.secondLastName : ''
  }`;
  const email = `${userData.email}`;

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

  function renderUserStatus() {
    if (!userDetails) {
      return null;
    }

    if (userDetails.status === 'active') {
      return (
        <div className='flex w-full justify-center md:justify-start'>
          {/* <BsFillTriangleFill className='h-10 w-10 text-red-500 md:hidden' /> */}
          <button
            className='m-[0px] ml-[30vh] mb-4 flex h-10 w-60 items-center justify-center rounded-full bg-[#85A547] px-5 py-2.5 font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 min-[320px]:ml-[5vh] md:ml-[18vh] lg:ml-[25vh]'
            onClick={() =>
              router.push(`/register/user/${userData.idUser}/verify`)
            }
          >
            <h4 className='p-2 text-center'>Verificar perfil</h4>
          </button>
        </div>
      );
    }

    if (userDetails.status === 'send') {
      return (
        <div>
          <h1 className='text-primary'>QR enviado espere</h1>
        </div>
      );
    }

    if (!userDetails.status === 'send' || !userDetails.status === 'active') {
      return (
        <div>
          <h1 className='text-primary'>Usuario inactivo</h1>
        </div>
      );
    }
  }

  if (!userDetails) {
    return (
      <React.Fragment>
        <div className='flex h-screen items-center justify-center'>
          <svg
            aria-hidden='true'
            class='mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span class='sr-only'>Loading...</span>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div className='background-image1 '>
      <div className='flex h-full min-h-[70vh] flex-col items-center justify-center gap-4 p-5 '>
        <div className='flex w-96 flex-col items-center gap-4 rounded-3xl bg-black pt-4 pb-4 sm:w-[400px] md:h-[370px] md:w-[800px] md:flex-row lg:w-[900px]'>
          <div className='mr-5 ml-12 flex-col items-center md:ml-16 md:flex lg:ml-20'>
            <div className='flex flex-col items-center gap-4'>
              <Image width={200} height={200} alt='User Imagen' src={user} />
              <h4 className='text-amber-300'>{fullName}</h4>
              <h4 className='text-white'>{email}</h4>
              <button
                onClick={() =>
                  router.push(`/register/user/${userData.idUser}/edit`)
                }
                className='w-40 rounded-3xl bg-green-600 p-2 text-white'
              >
                Editar Perfil
              </button>
            </div>
          </div>
          <div className='mt-6 flex w-96 flex-col items-center gap-5 p-2 sm:w-[400px] md:w-3/4'>
            {renderUserStatus()}
            <div class='h-2 w-[35vh] rounded-full bg-gradient-to-r from-amber-500 to-green-500'></div>
            <div className=' mt-2 flex h-10 flex-wrap items-center rounded-full bg-white text-center'>
              <h2 className=' ml-10'>PUNTOS</h2>
              <div className='ml-[68px] flex h-full w-20 items-center justify-center rounded-r-full bg-green-500 min-[320px]:ml-[58px] md:ml-[49px]'>
                <h2>{userDetails.points}</h2>
              </div>
            </div>
            <div class='h-2 w-[35vh] rounded-full bg-gradient-to-r from-amber-500 to-green-500'></div>
            <div className=' mt-2 flex h-10 flex-wrap items-center rounded-full bg-white text-center'>
              <h2 className=' ml-10'>BALDES</h2>
              <div className='ml-[68px] flex h-full w-20 items-center justify-center rounded-r-full bg-green-500 min-[320px]:ml-[8vh] md:ml-[52px]'>
                <h2>{userDetails.buckets}</h2>
              </div>
            </div>

            {/* <div className='flex flex-col items-center gap-5'>
              <label class='relative inline-flex cursor-pointer items-center self-center'>
                <input type='checkbox' value='' class='peer sr-only' />
                <div class="peer h-11 w-20 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-10 after:w-10 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              </label>
              <h1 className='text-white'>Tabla Posicion</h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
