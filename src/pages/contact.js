import React from 'react';
//import icon location react-icons
import { FaMapMarkerAlt } from 'react-icons/fa';
//import icon phohet react-icons
import { FaPhoneAlt } from 'react-icons/fa';
//import icon email react-icons
import { FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <div className='mainDiv'>
      <div className='containerContact'>
        <h1 className=' text-primary'>Contactanos</h1>
        <p>Contactenos por este medio para cualquier consulta </p>
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
            className='rounded-md border-0 bg-gray-200  text-sm placeholder-secondary placeholder:tracking-wider'
            name='escribe'
            id='escribe'
            cols='20'
            rows='5'
            placeholder='Escribamos'
          ></textarea>
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
          <div className='flex justify-center'>
            <button className='h-12 w-60 bg-primary text-xl font-semibold text-white'>
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
