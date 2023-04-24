import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {
  FaChartLine,
  FaCheck,
  FaPhoneAlt,
  FaShoppingCart,
} from 'react-icons/fa';

import { AuthContext } from '../context/authContext';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { isLoggedIn, userData } = useContext(AuthContext); // Accede al contexto de autenticación
  const displayName = isLoggedIn
    ? `${userData.firstName} ${userData.lastName}`
    : 'Guest';

  //type user
  var typeUser = isLoggedIn ? userData.type : 'Guest';

  if (typeUser === 'user_superior') {
    typeUser = 'Superior';
  } else if (typeUser === 'user_normal') {
    typeUser = 'Normal';
  }

  const handleToggle = () => {
    setIsActive(!isActive);
  };
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
        <div className='relative self-center'>
          <button
            className='flex items-center text-gray-800 focus:outline-none'
            onClick={handleToggle}
          >
            <FaUserCircle className='h-6 w-6' />
          </button>
          <div
            className={`absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ${
              isActive ? '' : 'hidden'
            }`}
          >
            <span className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
              {displayName}
            </span>
            <span className='block px-4 py-2  text-gray-800 hover:bg-gray-100'>
              Usuario: <strong>{typeUser}</strong>
            </span>

            <hr className='mx-4' />
            <Link
              href='/profile'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              Perfil
            </Link>
            <Link
              href='/register/user/new'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              Registrar
            </Link>
            <Link
              href='/login'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              Login
            </Link>
            <Link
              href='/api/auth/logout'
              className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
