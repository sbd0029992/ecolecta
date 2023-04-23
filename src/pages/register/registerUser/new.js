/* eslint-disable no-console */
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function UserRegister() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [centerMap, setCenterMap] = useState({
    lat: -17.404357772400502,
    lng: -66.14837526944187,
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
      });
      setCenterMap({
        lat: parseFloat(user.location.latitude),
        lng: parseFloat(user.location.longitude),
      });
      setShowPasswordField(false);
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

  const markerRef = useRef();

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'latitudeMap' || id === 'longitudeMap') {
      setNewUser((prevNewUser) => ({
        ...prevNewUser,
        location: {
          ...prevNewUser.location,
          [id]: value,
        },
      }));
    } else {
      setNewUser({ ...newUser, [id]: value });
    }
  };

  const handleDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      location: {
        ...prevNewUser.location,
        latitude: lat,
        longitude: lng,
      },
    }));
  };

  const createUser = async () => {
    try {
      await fetch(`${apiUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async () => {
    const updatedUser = { ...newUser };
    delete updatedUser.password;

    try {
      await fetch(`${apiUrl}/api/users/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.id) {
      await updateUser();
      // await push('/');
    } else {
      await createUser(newUser);
      console.log(newUser);
      await push('/login');
    }
  };

  return (
    <div className='flex justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>{query.id ? 'Edit User' : 'Register User'}</h1>
        <form class='formulary' onSubmit={handleSubmit}>
          <select
            id='type'
            value={newUser.type}
            onChange={handleChange}
            class='mt-3 block w-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-secondary text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          >
            <option className='text-sm' value='user_normal' selected>
              Normal Client
            </option>
            <option value='user_superior'>VIP client</option>
          </select>
          <div class='mb-6 grid gap-3 '>
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
                SEGUNDO APELLIDO
              </label>
              <input
                type='text'
                id='secondLastName'
                value={newUser.secondLastName}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='John'
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
                UBICACION
              </label>
              <div class='h-[300px] w-[250px]'>
                <GoogleMap
                  // eslint-disable-next-line no-undef
                  mapTypeId={google.maps.MapTypeId.HYBRID}
                  zoom={14}
                  center={centerMap}
                  mapContainerStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <MarkerF
                    id='markerComponent'
                    ref={markerRef}
                    position={{
                      lat:
                        parseFloat(newUser.location.latitude) || centerMap.lat,
                      lng:
                        parseFloat(newUser.location.longitude) || centerMap.lng,
                    }}
                    draggable={true}
                    onDragEnd={handleDragEnd}
                  />
                </GoogleMap>
              </div>
              <input
                hidden
                id='latitudeMap'
                value={newUser.location.latitude}
                onChange={handleChange}
              />
              <input
                hidden
                id='longitudeMap'
                value={newUser.location.longitude}
                onChange={handleChange}
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
            {showPasswordField && (
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  PASSWORD
                </label>
                <input
                  type='password'
                  id='password'
                  minLength={6}
                  value={newUser.password}
                  onChange={handleChange}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  required
                />
              </div>
            )}

            <div className='flex justify-center'>
              <button
                type='submit'
                class='m-[0px] mt-2 h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                {query.id ? 'Actualizar' : 'Registrar'}
              </button>
            </div>
            <div>
              <Link
                href='/login'
                class='block text-right text-sm font-bold dark:text-white'
              >
                Tienes una cuenta? Inicia sesion
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
