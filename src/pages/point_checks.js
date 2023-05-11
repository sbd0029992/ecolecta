import Link from 'next/link';
import React from 'react';

function point_checks() {
  return (
    <div className='background-image1 h-[62vh] w-auto xl:h-[70vh]'>
      <div className='mt-20 h-[170px] w-full  rounded-b-lg bg-white text-center lg:mt-16 lg:h-[80px] xl:mt-20 xl:h-[50px] '>
        <label className='text-justify text-[35px] '>
          ¿Seguro de realizar esta compra?
        </label>
      </div>
      <div className='content items-center justify-center text-center text-white '>
        <h1 className='mt-20 text-[60px]'>20 pts</h1>
        <h2 className='mt-10 text-[35px]'>por</h2>
        <h2 className='mt-10 text-[35px]'>10 bs.</h2>
        <div className='content items-center justify-center text-center '>
          <button className='mt-10 h-20 w-[300px] rounded-lg bg-prymary font-primary text-[30px] text-white no-underline xl:w-[500px] '>
            <Link href='/profile'>CONFIRMAR</Link>
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}

export default point_checks;
