import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import { userServiceFactory } from '../../clientServices/userService';
import useUser from '../../lib/useUser';

import { AuthContext } from '/src/context/authContext';

const userService = userServiceFactory();

function LoginPage() {
  const { push } = useRouter();
  const { isLoggedIn } = useContext(AuthContext);
  const { user, mutateUser } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redireccionar si el usuario está logueado
    if (isLoggedIn) {
      push('/');
    }
  }, [isLoggedIn, push]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      mutateUser(await userService.login(email, password));
    } catch (error) {
      alert(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.isLoggedIn) {
      push('/');
    }
  }, [user, push]);

  return (
    <div className='flex h-[100vh]  w-full items-center justify-center bg-blue-200'>
      <section className='h-[min-content] justify-center bg-white p-1  font-secondary min-[320px]:h-auto min-[320px]:w-[420px] xl:h-[70vh] xl:w-[40vh] xl:rounded-lg'>
        <div className=' flex-justify-center h-auto w-full p-2'>
          <div className='display snap-center  p-1'>
            <br />
            <h1 className='text-2xl font-extrabold text-black'>
              Inicio de sesion
            </h1>

            <br />
            <h5>Acceda a su cuenta</h5>
          </div>
          <br />
          <div className='mb-2 p-1'>
            {!user ? (
              <h1>Loading....</h1>
            ) : (
              <>
                {!user.isLoggedIn && (
                  <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                      <label
                        id='email'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                      >
                        Nombre de Usuario
                      </label>
                      <input
                        type='email'
                        id='email'
                        className='focus:border-black-500 block w-full rounded-lg border border-gray-300 bg-gray-50
                p-2.5 text-sm text-gray-900 focus:ring-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400
                  dark:focus:border-black dark:focus:ring-black'
                        placeholder='name@flowbite.com'
                        onChange={emailHandler}
                        required
                      />
                    </div>
                    <div className='mb-6'>
                      <label
                        id='password'
                        className='mb-2 block text-sm font-medium text-gray-900 dark:text-black'
                      >
                        Contraseña
                      </label>
                      <input
                        type='password'
                        id='password'
                        className='block w-full rounded-lg border border-gray-300 bg-gray-50 
                p-2.5 text-sm text-gray-900 focus:border-black dark:border-gray-600 dark:bg-gray-200 dark:text-black dark:placeholder-gray-400 dark:focus:border-black
                  dark:focus:ring-black'
                        placeholder='Contraseña'
                        onChange={passwordHandler}
                        required
                      />

                      <div className='mt-3 snap-center' type='submit'>
                        <Link
                          href='/recuperar'
                          className='rounded-lg underline decoration-black '
                        >
                          Olvide mi contraseña
                        </Link>
                      </div>
                    </div>
                    <br />
                    <div className='justify-center text-center'>
                      <Link
                        href='/register/user/new'
                        id='remember'
                        className=' text-sm font-medium text-black underline decoration-black hover:file:underline dark:text-black'
                      >
                        No tengo cuenta
                      </Link>
                    </div>
                    <br />
                    <button
                      type='submit'
                      disabled={loading}
                      className=' min-[320px]: h-[50px] w-full rounded-2xl  bg-[#85A547]
                p-2 text-center text-sm font-medium text-white hover:bg-green-500 hover:file:bg-green-200 focus:outline-none focus:ring-4 focus:ring-blue-300
                dark:bg-[#85A547] dark:hover:bg-green-500 dark:focus:ring-green-500'
                    >
                      {loading ? 'Cargando...' : <Link href='/'>Acceder</Link>}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
export default LoginPage;
