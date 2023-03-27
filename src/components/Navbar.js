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
        <h1 className='text-primary '>ECO-lecta</h1>
      </div>
      <div className='flex flex-row gap-2 md:gap-5'>
        <div>
          <h4 className='hidden'>Productos</h4>
          <FaShoppingCart className='h-6 w-6' />
        </div>
        <div>
          <h4 className='hidden'>Check Page</h4>
          <FaCheck className='h-6 w-6' />
        </div>
        <div>
          <h4 className='hidden'>Check Recolector</h4>
          <FaCheck className='h-6 w-6' />
        </div>
        <div>
          <h4 className='hidden'>Contactos</h4>
          <FaPhoneAlt className='h-6 w-6' />
        </div>
        <div>
          <h4 className='hidden'>Dashboard</h4>
          <FaChartLine className='h-6 w-6' />
        </div>
        <div className='self-center'>
          <FaUserCircle className='h-6 w-6' />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
