import Link from 'next/link';
import React from 'react';

function point_checks() {
  return (
    <div className='h-full min-h-[70vh] w-auto bg-blue-300 xl:h-[70vh]'>
      <div className='flex w-full flex-col items-center justify-center rounded-b-lg bg-white py-10 text-center lg:h-[80px] xl:h-[50px] '>
        <h1 className='text-center text-3xl '>
          ¿Seguro de realizar esta compra?
        </h1>
      </div>
      <div className='mt-10 flex h-auto flex-col items-center justify-center gap-6 text-center text-white '>
        <div>
          <h1 className=' text-[60px]'>20 pts</h1>
        </div>
        <div>
          <h2 className=' text-[35px]'>por</h2>
        </div>
        <div>
          <h2 className=' text-[35px]'>10 bs.</h2>
        </div>
        <div className='content items-center justify-center text-center '>
          <button className='h-20 w-[300px] rounded-lg bg-prymary font-primary text-[30px] text-white no-underline xl:w-[500px] '>
            <Link href='/profile'>CONFIRMAR</Link>
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default point_checks;
