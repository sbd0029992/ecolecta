import React from 'react';
//import icon location react-icons
import { FaMapMarkerAlt } from 'react-icons/fa';
//import icon phohet react-icons
import { FaPhoneAlt } from 'react-icons/fa';
//import icon email react-icons
import { FaEnvelope } from 'react-icons/fa';
//import facebook, youtube, instagram react-icons

function Contact() {
  return (
    <div className='flex h-full w-full items-center justify-center bg-black py-14 sm:py-10 md:h-[70vh] '>
      <div className='flex h-fit w-[360px] flex-col gap-4 rounded-[60px] bg-white p-7 sm:w-[500px] md:w-[600px] lg:flex lg:h-[400px] lg:w-[750px] lg:flex-row lg:justify-evenly'>
        <div className='lg:w-1/2 '>
          <h1 className=' mb-3 text-center text-green-800'>
            PARA RECIBIR INFORMACION
          </h1>
          <form action='post' className='formContact'>
            <input
              className='rounded-md border-0 bg-gray-200 text-sm placeholder-secondary placeholder:tracking-wider'
              type='text'
              placeholder='Nombre'
            />
            <input
              className='rounded-md border-0 bg-gray-200 text-sm placeholder-secondary placeholder:tracking-wider'
              type='email'
              name='email'
              id='email'
              placeholder='Email'
            />
            <textarea
              className='border-0 bg-gray-200 text-sm placeholder-secondary placeholder:tracking-wider sm:rounded-md'
              name='escribe'
              id='escribe'
              cols='20'
              rows='3'
              placeholder='Escribamos'
            ></textarea>
            <div className='lg:hidden'>
              <div className='m-2 flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500 text-center'>
                <p>Av. Santa Cruz</p>
                <FaMapMarkerAlt className='ml-20 h-7 w-10 rounded-full bg-white p-1 text-black' />
              </div>
              <div className='text-centerr m-2 flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500'>
                <p className='ml-2'>+591 7707070</p>
                <FaPhoneAlt className='ml-20 h-7 w-10 rounded-full bg-white p-1 text-black' />
              </div>
              <div className='m-2 flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500 text-center'>
                <p className='ml-2'>ecoleta@gmail.com</p>
                <FaEnvelope className='ml-10 h-7 w-10 rounded-full bg-white p-1 text-black' />
              </div>
            </div>
            <div className='flex justify-center'>
              <button className='h-12 w-60 rounded-full bg-green-500 text-xl font-semibold text-black'>
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className='hidden flex-col items-center justify-center gap-5  lg:flex lg:w-1/2 '>
          <h1 className='mb-3 text-center text-black underline'>CONTACTANOS</h1>
          <div className='flex w-full flex-col items-center justify-center gap-4 text-center'>
            <div className='flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500 text-center'>
              <p>Av. Santa Cruz</p>
              <FaMapMarkerAlt className='ml-20 h-7 w-10 rounded-full bg-white p-1 text-black' />
            </div>
            <div className='text-centerr flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500'>
              <p className='ml-2'>+591 7707070</p>
              <FaPhoneAlt className='ml-20 h-7 w-10 rounded-full bg-white p-1 text-black' />
            </div>
            <div className='flex h-[50px] w-full items-center justify-center rounded-lg bg-green-500 text-center'>
              <p className='ml-2'>ecoleta@gmail.com</p>
              <FaEnvelope className='ml-10 h-7 w-10 rounded-full bg-white p-1 text-black' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
