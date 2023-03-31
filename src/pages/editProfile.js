import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import Link from 'next/link';
import React, { useMemo, useRef } from 'react';

function EditProfile() {
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

  // const handleMarkerDragEnd = () => {
  //   const pos = markerRef.marker.marker();
  //   let lat = pos.lat();
  //   let lng = pos.lng();

  //   // Asignar la posición a las variables de ASP.NET
  //   document.getElementById('latitudeMap').innerHTML = lat;
  //   document.getElementById('longitudeMap').innerHTML = lng;
  //   // Aquí puede agregar su código para actualizar los valores de latitud y longitud
  // };

  return (
    <div className='flex justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>Editar Informacion</h1>

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
              <div class='h-[50px] w-[250px]'></div>
              <input id='latitudeMap' value='-17,40005043784094' />
              <input id='longitudeMap' value='-66,15881707399646' />
            </div>
            <div className='flex justify-center'>
              <button
                type='button'
                class='m-[0px] h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                <Link href='/profile'>Modificar</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
