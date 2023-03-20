import React from 'react';
//import icon location react-icons
import { FaMapMarkerAlt } from 'react-icons/fa';
//import icon phohet react-icons
import { FaPhoneAlt } from 'react-icons/fa';
//import icon email react-icons
import { FaEnvelope } from 'react-icons/fa';
//import facebook, youtube, instagram react-icons
import { FaFacebookF } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';

function Contact() {
  return (
    <div className='mainDiv'>
      <div className='containerContact'>
        <div className='lg:w-1/2 '>
          <h1 className=' mb-3 text-primary'>Contactanos</h1>
          <p className='mb-3'>
            Contactenos por este medio para cualquier consulta{' '}
          </p>
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
              className='sm: rounded-md border-0 bg-gray-200  text-sm placeholder-secondary placeholder:tracking-wider'
              name='escribe'
              id='escribe'
              cols='20'
              rows='5'
              placeholder='Escribamos'
            ></textarea>
            <div className='lg:hidden'>
              <div className='flex items-center'>
                <FaMapMarkerAlt className='h-7 w-5 text-primary' />
                <p className='ml-2'>8888 Cantt Sialkot, Cochabamba</p>
              </div>
              <div className='flex items-center'>
                <FaPhoneAlt className='h-7 w-5 text-primary' />
                <p className='ml-2'>+591 7707070</p>
              </div>
              <div className='flex items-center'>
                <FaEnvelope className='h-7 w-5 text-primary' />
                <p className='ml-2'>ecoleta@gmail.com</p>
              </div>
            </div>
            <div className='flex justify-center'>
              <button className='h-12 w-60 bg-primary text-xl font-semibold text-white'>
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div className='-col hidden  flex-col items-center justify-center gap-10 lg:flex lg:w-1/2 '>
          <div className='m-0 h-1/2 w-1/2  bg-black'></div>
          <div className='flex flex-col gap-3'>
            <div className='flex items-center'>
              <FaMapMarkerAlt className='h-7 w-5 text-primary' />
              <p className='ml-2'>8888 Cantt Sialkot, Cochabamba</p>
            </div>
            <div className='flex items-center'>
              <FaPhoneAlt className='h-7 w-5 text-primary' />
              <p className='ml-2'>+591 7707070</p>
            </div>
            <div className='flex items-center'>
              <FaEnvelope className='h-7 w-5 text-primary' />
              <p className='ml-2'>ecoleta@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[100px] hidden w-14 flex-col items-center gap-5 rounded-r-3xl rounded-br-full bg-primary text-center lg:flex'>
        <div className='h-1'></div>
        <FaFacebookF className='h-10 w-10 text-white' />
        <FaYoutube className='h-10 w-10 text-white' />
        <FaInstagram className='h-10 w-10 text-white' />
        <div className='h-5'></div>
      </div>
    </div>
  );
}

export default Contact;
