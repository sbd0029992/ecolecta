import React from 'react';

function list(props) {
  const { quantity, user } = props.data;
  return (
    <div className=' flex flex-wrap rounded-lg bg-white sm:h-[50px] xl:w-[1000px]'>
      <div className='ml-10 p-5 text-left lg:ml-40 xl:ml-20'>{quantity}</div>
      <div className='ml-8 p-5 text-center lg:ml-[220px] xl:ml-[220px]'>
        {user}
      </div>
      <div className='ml-8 flex items-center lg:ml-[230px] xl:ml-[310px]'>
        <ellipse
          id='status_ellipse'
          className='h-[20px] w-[20px] rounded-full bg-green-500 '
        ></ellipse>
      </div>
    </div>
  );
}

export default list;
