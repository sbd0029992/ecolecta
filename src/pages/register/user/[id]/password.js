/* eslint-disable no-console */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UpdatePassword() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    ci: '',
    phone: '',
    birthdate: '',
    location: {
      latitude: '',
      longitude: '',
    },
    gender: 'M',
    email: '',
    password: '',
    status: 'active',
    type: 'user_normal',
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${
      day < 10 ? '0' : ''
    }${day}`;
  };

  const getUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/users/${query.id}`);
      const { user } = await res.json();
      setNewUser({
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        ci: user.ci,
        phone: user.phone,
        birthdate: formatDate(user.birthdate),
        location: {
          latitude: user.location.latitude,
          longitude: user.location.longitude,
        },
        email: user.email,
        status: user.status,
        type: user.type,
        gender: user.gender,
        password: user.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [id]: value,
    }));
  };

  const updateUser = async () => {
    const updatedUser = { ...newUser };
    delete updatedUser.password;

    try {
      const response = await fetch(`${apiUrl}/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('error completo:', errorData);
        let errorMessage = errorData.error || 'Ocurrió un error';
        if (errorMessage.includes('email_1 dup key')) {
          errorMessage = 'El email ingresado ya está en uso.';
        } else if (errorMessage.includes('ci_1 dup key')) {
          errorMessage = 'El CI ingresado ya está en uso.';
        } else if (errorMessage.includes('phone_1 dup key')) {
          errorMessage = 'El número de teléfono ingresado ya está en uso.';
        }
        toast.error(errorMessage);
      } else {
        push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al actualizar el usuario.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.id) {
      await updateUser();
    }
  };

  const handleChangePassword = (e) => {
    const { id, value } = e.target;
    setPasswordData((prevPasswordData) => ({
      ...prevPasswordData,
      [id]: value,
    }));
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Las contraseñas nuevas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/pass`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: query.id,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('error completo:', errorData);
        let errorMessage = errorData.error || 'Ocurrió un error';
        toast.error(errorMessage);
      } else {
        toast.success('Contraseña actualizada correctamente.');
        push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Ocurrió un error al actualizar la contraseña.');
    }
  };

  return (
    <div className='background-image1 flex items-center justify-center'>
      <div className=' mt-[10%] mb-[5%] h-full w-[330px] rounded-lg bg-green-200 p-8 pb-[0px]'>
        <h1>Cambiar Contraseña</h1>
        <form class='formulary' onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div hidden>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  NOMBRES
                </label>
                <input
                  name='firstName'
                  id='firstName'
                  value={newUser.firstName}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  placeholder='John'
                  required
                />
              </div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  PRIMER APELLIDO
                </label>
                <input
                  type='text'
                  id='lastName'
                  value={newUser.lastName}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  placeholder='PEPE'
                  required
                />
              </div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  CI
                </label>
                <input
                  type='number'
                  id='ci'
                  value={newUser.ci}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  placeholder='10101010'
                  required
                />
              </div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  TELEFONO
                </label>
                <input
                  type='number'
                  id='phone'
                  value={newUser.phone}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  placeholder='70707070'
                  required
                />
              </div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  FECHA DE NACIMIENTO
                </label>
                <input
                  type='date'
                  id='birthdate'
                  name='birthdate'
                  value={newUser.birthdate}
                  onChange={handleChange}
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  required
                  min='1950-01-01'
                  max={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  CORRERO ELECTRONICO
                </label>
                <input
                  type='email'
                  id='email'
                  value={newUser.email}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  placeholder='asdf@gmail.com'
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-black'>
                  CONTRASEÑA ACTUAL
                </label>
                <input
                  type='password'
                  id='currentPassword'
                  value={passwordData.currentPassword}
                  onChange={handleChangePassword}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  required
                />
              </div>

              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-black'>
                  NUEVA CONTRASEÑA
                </label>
                <input
                  type='password'
                  id='newPassword'
                  value={passwordData.newPassword}
                  onChange={handleChangePassword}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  required
                />
              </div>

              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-black'>
                  CONFIRMAR NUEVA CONTRASEÑA
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  value={passwordData.confirmPassword}
                  onChange={handleChangePassword}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  required
                />
              </div>

              <button
                class='mt-6 w-full rounded-lg bg-blue-500 p-2.5 text-sm text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
                onClick={updatePassword}
              >
                Actualizar Contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
