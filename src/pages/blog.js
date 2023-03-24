import Image from 'next/image';
import user from 'public/images/User.png';
import React from 'react';

function blog() {
  const comment = 'La mejor empresa para la ayuda al medio ambiente';
  return (
    <div className='h-[100vh] w-full bg-blue-300 '>
      <div className='content items-center justify-center p-2 text-center'>
        <button className='mt-10 h-10 w-[200px] rounded-lg bg-prymary font-primary text-white no-underline xl:w-[200px] '>
          Publicar
        </button>
      </div>
      <br />
      <div>
        <h2 className='ml-4 text-white xl:ml-20'>Noticias y Comentarios</h2>
      </div>
      <br />
      <div className='content items-center text-center lg:ml-[160px] lg:w-[700px] xl:ml-[300px] xl:w-[800px]'>
        <div className='content flex flex-nowrap'>
          <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
            <Image width={60} height={60} src={user} alt='User image' />
          </div>
          <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
            {comment}
            <label className=' invisible ml-6 text-[12px] lg:visible xl:visible'>
              Usuario: Juan Perez
            </label>
          </div>
        </div>
        <div className='content mt-6 flex flex-nowrap '>
          <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
            <Image width={60} height={60} src={user} alt='User image' />
          </div>
          <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
            {comment}
            <label className=' invisible ml-6  text-[12px] xl:visible'>
              Usuario: Juan Perez
            </label>
          </div>
        </div>
        <div className='content mt-6 flex flex-nowrap'>
          <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
            <Image width={60} height={60} src={user} alt='User image' />
          </div>
          <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
            {comment}
            <label className=' invisible ml-6  text-[12px] xl:visible'>
              Usuario: Juan Perez
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default blog;
