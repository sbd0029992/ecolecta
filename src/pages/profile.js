import Image from 'next/image';
import React from 'react';

import user from '/public/images/User.png';
function Profile() {
  return (
    <div className='background-image1  flex h-auto w-auto items-center justify-center  bg-center bg-no-repeat bg-blend-multiply  lg:h-[70vh]'>
      <div className='m-10 flex h-auto w-[40vh] flex-col items-center justify-center rounded-lg bg-black p-4 md:w-[50vh] lg:h-[60vh] lg:w-[100vh] lg:flex-row xl:w-[110vh]'>
        <div>
          <div className='m-6'>
            <h3 className='text-center text-amber-300'>MARCELA PEREZ</h3>
          </div>
          <Image
            className='roudend-full p-2'
            src={user}
            alt='Image user'
            width={200}
            height={200}
          />

          <div className='flex flex-col text-center '>
            <div class='w-50 h-2 rounded-full bg-gradient-to-r from-amber-500 to-green-500'></div>
            <h4 className=' text-center text-white'>marcale@gmail.com</h4>
            <h4 className=' text-center text-white'>787866543</h4>
          </div>
        </div>
        <div className='mt-6 p-6 lg:ml-20'>
          <div class='h-2 w-[35vh] rounded-full bg-gradient-to-r from-amber-500 to-green-500'>
            ...
          </div>
          <div className=' mt-10 flex h-10 flex-wrap items-center rounded-full bg-white text-center'>
            <h2 className=' ml-10'>PUNTOS</h2>
            <div className='ml-[95px] flex h-full w-20 items-center justify-center rounded-r-full bg-green-500'>
              <h2>200</h2>
            </div>
          </div>
          <div class=' invisible mt-6 h-[1vh] w-[35vh] rounded-full bg-gradient-to-r from-amber-500 to-green-500 first-letter:h-2 lg:visible xl:visible'>
            ...
          </div>
          <div className=' mt-10 flex h-10 flex-wrap items-center rounded-full bg-white text-center'>
            <h2 className=' ml-10'>BALDES</h2>
            <div className='ml-[97px] flex h-full w-20 items-center justify-center rounded-r-full bg-green-500'>
              <h2>2</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
