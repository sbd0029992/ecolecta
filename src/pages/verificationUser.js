import Image from 'next/image';
import qr from 'public/images/qr.jpg';
import user from 'public/images/User.png';
import verify from 'public/images/verify.png';
import React from 'react';

function VerificationPageUser() {
  const warning =
    'Para completar su registromande el recibo del pago,se le verificara la cuenta y mandara un bade a su ubicacion';
  return (
    <div className='content background-image1 h-[100vh] w-full items-center justify-center p-10 xl:h-[70vh] '>
      <div className='xl:content lg:content lg:flex lg:flex-nowrap lg:justify-center xl:flex xl:flex-nowrap xl:justify-center'>
        <div className='content h-[400px] w-[320px] items-center justify-center  rounded-lg bg-green-900 p-[10px] backdrop-saturate-200 lg:p-4 xl:p-4 '>
          <div className='ml-[50px] h-[200px] w-[200px] rounded-full bg-white '>
            <Image src={user} className='z-0 rounded-full' alt='image user ' />
            <Image
              src={verify}
              className='z-5 absolute top-[160px] right-14 rounded-full'
              width={50}
              height={50}
              gsd
              alt='verify'
            />
          </div>
          <div className='content items-center justify-center p-10 text-[25px]'>
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

        <div className=' h-[350px] w-[320px] bg-black text-center text-[20px] text-white lg:h-[400px] lg:p-4 xl:h-[400px] xl:w-[320px] xl:p-4'>
          <div class='mt-2 mb-2 ml-2 h-2 w-[30vh] rounded-full bg-gradient-to-r from-amber-500 to-green-500'></div>
          {warning}
          <Image
            src={qr}
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
