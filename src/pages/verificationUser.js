import Image from 'next/image';
import React from 'react';

function VerificationPageUser() {
  const warning =
    'Para completar su registromande el recibo del pago,se le verificara la cuenta y mandara un bade a su ubicacion';
  return (
    <div className='content min-h-[70vh] w-full items-center justify-center bg-prymary py-5   xl:h-[70vh] '>
      <div className='xl:content lg:content md:flex md:justify-center lg:flex-nowrap lg:justify-center xl:flex xl:flex-nowrap xl:justify-center '>
        <div className='content bg-green/150 m-auto h-[400px] w-[320px] items-center  justify-center rounded-lg backdrop-saturate-200 md:m-0 lg:p-4 xl:p-4 '>
          <div className='ml-[50px] h-[200px] w-[200px] rounded-full bg-white '>
            <Image
              src='/images/verify.png'
              className='z-0 rounded-full'
              width={200}
              height={200}
              alt='image user '
            />
            {/* <Image
              src='/images/verify.png'
              className='z-5 absolute top-[160px] right-14 rounded-full'
              width={50}
              height={50}
              alt='verify'
            /> */}
          </div>
          <div className='content items-center justify-center p-10 text-[25px]  '>
            <button className=' ml-4 h-10 w-[200px] rounded-lg bg-[#00FF0A] font-primary text-white xl:w-[200px]'>
              Comprobante
            </button>
            <br />
            <br />
            <button className='ml-4 h-10 w-[200px] rounded-lg bg-[#00FF0A] font-primary text-white xl:visible xl:w-[200px] '>
              Enviar
            </button>
          </div>
        </div>
        <div className='m-auto h-[350px] w-[320px] bg-white/50 text-center text-[22px] md:m-0 lg:h-[400px] lg:p-4 xl:h-[400px] xl:w-[320px] xl:p-4'>
          {warning}
          <Image
            src='/images/verify.png'
            className='ml-[70px] p-2'
            width={170}
            height={100}
            alt='image qr'
          />
        </div>
      </div>
    </div>
  );
}
export default VerificationPageUser;
