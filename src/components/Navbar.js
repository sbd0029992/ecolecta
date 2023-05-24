import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {
  FaChartLine,
  FaCheck,
  FaPhoneAlt,
  FaShoppingCart,
} from 'react-icons/fa';

import logo from '../../public/images/logo.png';

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (dataUser !== null) {
      setLoading(false);
    }
  }, [dataUser]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let timer;
    if (isActive) {
      timer = setTimeout(() => {
        setIsActive(false);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isActive]);

  const displayName = dataUser.isLoggedIn
    ? `${dataUser.firstName} ${dataUser.lastName} ${dataUser.lastName}`
    : 'Invitado';

  //type user
  var typeUser = dataUser.isLoggedIn ? dataUser.type : 'Invitado';

  if (typeUser === 'user_superior') {
    typeUser = 'Superior';
  } else if (typeUser === 'user_normal') {
    typeUser = 'Normal';
  }

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <span>Loading...</span>
      </div>
    );
  }

  // const handleMouseEnter = () => {
  //   if (window.innerWidth > 768) {
  //     setIsHovering(true);
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (window.innerWidth > 768) {
  //     setIsHovering(false);
  //   }
  // };

  return (
    <React.Fragment>
      <div>
        <Link href='/' class='flex'>
          <Image
            class=' h-full w-[30px] md:w-[40px]'
            src={logo}
            alt='imagen de un check'
          />
          <h2 className='text-prymary2'>Eco</h2>
          <h2 className='text-primary'>lecta</h2>
        </Link>
      </div>
      <div className='flex flex-row gap-4 sm:gap-6 '>
        <div>
          <Link
            href='/product/tienda'
            className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
          >
            Productos
          </Link>
          <Link href='/product/tienda'>
            <FaShoppingCart className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        {dataUser.isLoggedIn ? (
          <>
            {dataUser.type === 'collector' ? (
              <div className='flex flex-row gap-4 sm:gap-6 '>
                <div>
                  <Link
                    href='/collect/collector/list'
                    className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
                  >
                    List Collect
                  </Link>
                  <Link href='/collect/collector/list'>
                    <FaCheck className='h-6 w-6 lg:hidden' />
                  </Link>
                </div>
                <div>
                  <Link
                    href='/collect/collector/listCollector'
                    className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
                  >
                    Check Collector
                  </Link>

                  <Link href='/collect/collector/listCollector'>
                    <FaPhoneAlt className='h-6 w-6 lg:hidden' />
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {dataUser.type === 'user_normal' ||
                dataUser.type === 'user_superior' ? (
                  <div className='flex flex-row gap-4 sm:gap-6 '>
                    <Link
                      href='/collect/user/list'
                      className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
                    >
                      Check Page
                    </Link>
                    <Link href='/collect/user/list'>
                      <FaCheck className='h-6 w-6 lg:hidden' />
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </>
        ) : null}

        <div>
          <Link
            href='/contact'
            className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
          >
            Contactos
          </Link>
          <Link href='/contact'>
            <FaChartLine className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div>
          <Link
            href='/dashboard'
            className='hidden from-prymary to-[#7af33e] p-[7px] hover:rounded-3xl hover:bg-gradient-to-r lg:block'
          >
            Tablero Posiciones
          </Link>
          <Link href='/dashboard'>
            <FaChartLine className='h-6 w-6 lg:hidden' />
          </Link>
        </div>
        <div
          className='relative self-center'
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
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
            {dataUser.isLoggedIn ? (
              <div>
                {dataUser.type === 'collector' ? (
                  <Link
                    href='/register/collector/profile'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Perfil
                  </Link>
                ) : (
                  <Link
                    href='/register/user/profile'
                    className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                  >
                    Perfil
                  </Link>
                )}

                <Link
                  href='/api/auth/logout'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div>
                <Link
                  href='/login'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href='/register/user/new'
                  className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
