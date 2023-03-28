import Link from 'next/link';
import React from 'react';
//import profile icon react-icons
import { FaUserCircle } from 'react-icons/fa';
//import product,check,contact,dashboard icons react-icons
import {
  FaChartLine,
  FaCheck,
  FaPhoneAlt,
  FaShoppingCart,
} from 'react-icons/fa';

function Navbar() {
  return (
    <React.Fragment>
      <div>
        <Link href='/'>
          <h1 className='text-primary '>ECO-lecta</h1>
        </Link>
      </div>
      <div className='flex flex-row gap-4 sm:gap-6 '>
        <div>
          <Link href='/tiendaProductos' className='hidden lg:block'>
            Productos
          </Link>
          <Link href='/tiendaProductos'>
            <FaShoppingCart className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div>
          <Link href='/user_check' className='hidden lg:block'>
            Check Page
          </Link>
          <Link href='/user_check'>
            <FaCheck className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div>
          <Link href='/recolectorCheck' className='hidden lg:block'>
            Check Recolector
          </Link>
          <Link href='/recolectorCheck'>
            <FaCheck className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div>
          <Link href='/contact' className='hidden lg:block'>
            Contactos
          </Link>
          <Link href='/contact'>
            <FaPhoneAlt className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div>
          <Link href='dashboard' className='hidden lg:block'>
            Dashboard
          </Link>
          <Link href='dashboard'>
            <FaChartLine className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div className='self-center'>
          <Link href='/profile'>
            <FaUserCircle className='h-6 w-6' />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
