import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import React, { useMemo, useRef } from 'react';

function Register() {
  const markerRef = useRef();

  var centerMap = {
    lat: -17.404357772400502,
    lng: -66.14837526944187,
  };

  const libraries = useMemo(() => ['places'], []);
  // const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC3llKmj59uUvV35g4136lCA0oUwA6I-WE',
    libraries: libraries,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>Register</h1>
        <select
          id='countries'
          class='mt-3 block w-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-secondary text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
        >
          <option className='text-sm' value='user_normal' selected>
            Normal Client
          </option>
          <option value='user_superior'>VIP client</option>
        </select>
        <form class='formulary'>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                NOMBRES
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='John'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                PRIMER APELLIDO
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='PEPE'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                SEGUNDO APELLIDO
              </label>
              <input
                type='text'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='John'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                CI
              </label>
              <input
                type='number'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='10101010'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                TELEFONO
              </label>
              <input
                type='number'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='70707070'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                FECHA DE NACIMIENTO
              </label>
              <input
                type='date'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
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
                    position={centerMap}
                    draggable={true}
                    // onDragEnd={onPositionChanged}
                    // onClick={() => {
                    //   // console.log('marker position', markerRef);
                    // }}
                  />
                </GoogleMap>
              </div>
              <input id='latitudeMap' value='-17,40005043784094' />
              <input id='longitudeMap' value='-66,15881707399646' />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                CORRERO ELECTRONICO
              </label>
              <input
                type='email'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='asdf@gmail.com'
                required
              />
            </div>
            <div>
              <label
                for='first_name'
                class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'
              >
                PASSWORD
              </label>
              <input
                type='password'
                id='first_name'
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                required
              />
            </div>
            <div>
              <Link
                href='/login'
                for='first_name'
                class='mb-2 mt-2 block text-center text-sm font-bold dark:text-white'
              >
                Tengo mi cuenta
              </Link>
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                class='m-[0px] h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                Registrar
              </button>{' '}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
