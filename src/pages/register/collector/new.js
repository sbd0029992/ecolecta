/* eslint-disable @next/next/no-img-element */
import { S3 } from 'aws-sdk';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function UserRegister({ env }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idUser, setIdUser] = useState({
    id: '',
  });
  const [userImages, setUserImages] = useState([]);
  const [showPasswordField, setShowPasswordField] = useState(true);
  const [trucks, setTrucks] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    secondLastName: '',
    ci: '',
    license: '',
    phone: '',
    birthdate: '',
    gender: 'M',
    email: '',
    password: '',
    status: '1',
    type: 'collector',
    photos: query.id ? [''] : [],
    truck: query.id ? null : null,
  });
  console.log('🚀 ~ file: new.js:35 ~ UserRegister ~ newUser:', newUser);

  async function fetchTrucks() {
    const response = await fetch(`${apiUrl}/api/trucks`);
    const data = await response.json();
    setTrucks(data);
  }

  useEffect(() => {
    fetchTrucks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setIdUser({ id: user._id });
      setUserImages(user.photos);
      setNewUser({
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        ci: user.ci,
        license: user.license,
        phone: user.phone,
        birthdate: formatDate(user.birthdate),
        email: user.email,
        status: user.status,
        type: user.type,
        gender: user.gender,
        photos: user.photos,
        truck: user.truck,
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'photos') {
      setNewUser({ ...newUser, [id]: [value] });
    } else if (id === 'status') {
      setNewUser({ ...newUser, [id]: value === '1' ? '1' : '0' });
    } else {
      setNewUser({ ...newUser, [id]: value });
    }
  };

  let s3;
  if (env && env.awsAccessKeyId && env.awsSecretAccessKey && env.awsRegion) {
    s3 = new S3({
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
      region: env.awsRegion,
    });
  }

  // Función para subir una imagen a S3 y devolver la URL
  async function uploadToS3(file, userId) {
    if (!s3) {
      console.error('S3 client is not initialized');
      return;
    }
    const fileName = `${userId}/${file.name}`;
    const params = {
      Bucket: env.awsBucket,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const response = await s3.upload(params).promise();
      return response.Location;
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  }

  const createUser = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
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
      toast.error('Ocurrión un error al registrar al usuario');
    }
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
      toast.error('Ocurrión un error al registrar al usuario');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (query.id) {
      const stringId = idUser.id.toString();
      const imageUrls = (
        await Promise.all(
          selectedImages.map(async (file) => {
            const imageUrl = await uploadToS3(file, stringId);
            return imageUrl;
          })
        )
      ).filter((url) => url);

      const updatedAffiliate = {
        ...newUser,
        photos: newUser.photos.concat(imageUrls),
      };

      await updateUser(updatedAffiliate);
      setNewUser(updatedAffiliate);
    } else {
      await createUser(newUser);
    }
  };

  const updateUserWithImages = async () => {
    await updateUser();
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (query.id && newUser.photos.length > 0 && isSubmitting) {
      updateUserWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser.photos, isSubmitting]);

  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newUser.photos];
    updatedImageUrls.splice(index, 1);
    setNewUser({ ...newUser, photos: updatedImageUrls });
  }

  async function handleRemoveImageS3(index) {
    if (!s3) {
      console.error('S3 client is not initialized');
      return;
    }
    // Elimina la imagen seleccionada del array de imágenes seleccionadas
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    // Obtiene el nombre del archivo de la imagen eliminada
    const imageToDelete = newUser.photos[index];
    const fileName = imageToDelete.split('/').pop();

    // Actualiza el estado de newUser con las imágenes actualizadas
    const updatedImageUrls = newUser.photos.filter(
      (imageUrl) => imageUrl !== imageToDelete
    );
    setNewUser({ ...newUser, photos: updatedImageUrls });

    // Elimina el archivo de la imagen del bucket de S3
    const params = {
      Bucket: env.awsBucket,
      Key: `${idUser.id}/${fileName}`,
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        console.error('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);

        // Actualiza los datos en la base de datos con el affiliateo actualizado
        await updateUser({ ...newUser, photos: updatedImageUrls });
      }
    });
  }

  return (
    <div className='background-plantas flex justify-center'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>{query.id ? 'Edit Recolector' : 'Register Recolector'}</h1>
        <form class='formulary' onSubmit={handleSubmit}>
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
                class='block w-full rounded-lg border border-black bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese sus nombres'
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
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su primer apellido'
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
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su segundo apellido'
              />
            </div>
            <div className='flex justify-between'>
              <label class='mb-2 mt-2 block self-center text-sm font-medium text-gray-500 dark:text-white'>
                Genero:
              </label>
              <select
                id='gender'
                value={newUser.gender}
                onChange={handleChange}
                class='mt-3 block w-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 font-secondary text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
              >
                <option className='text-sm' value='M' selected>
                  Masculino
                </option>
                <option value='F'>Femenino</option>
              </select>
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                CEDULA DE IDENTIDAD
              </label>
              <input
                type='text'
                id='ci'
                value={newUser.ci}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su CI'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                CARNET VEHICULAR
              </label>
              <input
                type='text'
                id='license'
                value={newUser.license}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su carnet vehicular'
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
                maxLength='12'
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su numero de telefono'
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
                className='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                required
                min='1950-01-01'
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
            {query.id ? (
              <div className='flex justify-between'>
                <label class='mb-2 mt-2 block self-center text-sm font-medium text-gray-500 dark:text-white'>
                  Camion:
                </label>
                <select
                  class='mt-3 block w-36 rounded-lg border border-gray-300 bg-green-300 p-2.5 font-secondary text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
                  id='truck'
                  name='truck'
                  onChange={handleChange}
                  value={newUser.truck}
                >
                  {trucks.map((truck) => (
                    <option
                      className='text-lg'
                      key={truck._id}
                      value={truck._id}
                    >
                      {truck.plate}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {query.id ? (
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  Photos
                </label>
                <input
                  type='file'
                  id='photos'
                  accept='image/*'
                  onChange={(e) => {
                    const filesArray = Array.from(e.target.files);
                    setSelectedImages([...selectedImages, ...filesArray]);
                  }}
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  max='5145728' // 5MB en bytes
                />
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    class='relative mr-2 mb-2 inline-block w-full'
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image}
                      class='h-30 w-full rounded-lg shadow-md'
                      height={100}
                      width={100}
                    />
                    <button
                      class='absolute top-0 right-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white text-xs font-bold text-red-500 focus:outline-none'
                      onClick={() => handleRemoveImage(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {userImages.length > 0 ? (
                  <div>
                    <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                      Existing Photos
                    </label>
                    <div class='flex flex-wrap'>
                      {userImages.map((image, index) => (
                        <div
                          key={index}
                          class='relative mr-2 mb-2 inline-block w-full'
                        >
                          <img
                            src={image}
                            alt={image.name}
                            class='h-30 w-full rounded-lg shadow-md'
                            height={100}
                            width={100}
                          />
                          <button
                            class='absolute top-0 right-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-red-500 text-xs font-bold text-white focus:outline-none'
                            onClick={() => handleRemoveImageS3(index)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                CORRERO ELECTRONICO
              </label>
              <input
                type='email'
                id='email'
                value={newUser.email}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Ingrese su correo electronico '
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
                  class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                  required
                  placeholder='Ingrese su password'
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
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/env`);
  const env = await res.json();
  return {
    props: {
      env,
    },
  };
}
