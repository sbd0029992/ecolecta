import Image from 'next/image';
import React from 'react';

function listComment(props) {
  const { photo, comment, user } = props.data;
  return (
    <div>
      <div className='content flex flex-nowrap'>
        <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
          <Image width={60} height={60} src={photo} alt='User image' />
        </div>
        <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
          {comment}
          <label className=' invisible ml-6 text-[12px] lg:visible xl:visible'>
            {user}
          </label>
        </div>
      </div>
      <div className='content mt-6 flex flex-nowrap '>
        <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
          <Image width={60} height={60} src={photo} alt='User image' />
        </div>
        <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
          {comment}
          <label className=' invisible ml-6  text-[12px] xl:visible'>
            {user}
          </label>
        </div>
      </div>
      <div className='content mt-6 flex flex-nowrap'>
        <div className=' ml-8 h-12 w-12 rounded-full bg-white'>
          <Image width={60} height={60} src={photo} alt='User image' />
        </div>
        <div className='ml-5 w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
          {comment}
          <label className=' invisible ml-6  text-[12px] xl:visible'>
            {user}
          </label>
        </div>
      </div>
    </div>
  );
}

export default listComment;