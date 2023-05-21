/* eslint-disable @next/next/no-img-element */
/* eslint-disable unused-imports/no-unused-vars */
import { S3 } from 'aws-sdk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import withSession from '../../../lib/session';

import { AuthContext } from '/src/context/authContext';

export default function NewCollect({ env }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { userData } = useContext(AuthContext);
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [idCollect, setIdCollect] = useState({
    id: '',
  });
  const [collectImages, setCollectImages] = useState([]);
  const [newCollect, setNewCollect] = useState({
    collector: null,
    user: query.id ? null : [],
    status: 1,
    points: '',
    buckets: null,
    description: '',
    time: '',
    fault: 0,
    images: query.id ? [''] : [],
  });
  const getCollect = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/collects/${query.id}`);
      const apiCollect = await res.json();
      const date = new Date(apiCollect.time);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      } ${hour < 10 ? `0${hour}` : hour}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
      apiCollect.time = time;
      setIdCollect({ id: apiCollect._id });
      setCollectImages(apiCollect.images);
      setNewCollect({
        collector: apiCollect.collector,
        user: apiCollect.user,
        status: apiCollect.status,
        points: apiCollect.points,
        buckets: apiCollect.buckets,
        description: apiCollect.description,
        time: apiCollect.time,
        fault: apiCollect.fault,
        images: apiCollect.images,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData && userData.idUser) {
      setNewCollect((prevCollect) => ({
        ...prevCollect,
        user: userData.idUser,
      }));
    }
    if (query.id) {
      getCollect();
    }
    setIsDataLoaded(true); // Marcar los datos como cargados
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id, userData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'images') {
      setNewCollect({ ...newCollect, [id]: [value] });
    } else {
      setNewCollect({ ...newCollect, [id]: value });
    }
  };

  // Configura el cliente de S3
  let s3;
  if (env && env.awsAccessKeyId && env.awsSecretAccessKey && env.awsRegion) {
    s3 = new S3({
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
      region: env.awsRegion,
    });
  }

  // Función para subir una imagen a S3 y devolver la URL
  async function uploadToS3(file, productId) {
    if (!s3) {
      console.error('S3 client is not initialized');
      return;
    }
    const fileName = `${productId}/${file.name}`;
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

  const createCollect = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/collects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCollect),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Ocurrió un error';
        alert(errorMessage);
      } else {
        push('/');
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };

  const updateCollect = async (collect) => {
    try {
      const response = await fetch(`${apiUrl}/api/collects/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collect),
      });
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Ocurrió un error';
        alert('Error al crear el producto', errorMessage);
      } else {
        push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (query.id) {
      const stringId = idCollect.id.toString();
      const imageUrls = (
        await Promise.all(
          selectedImages.map(async (file) => {
            const imageUrl = await uploadToS3(file, stringId);
            return imageUrl;
          })
        )
      ).filter((url) => url);

      const updatedProduct = {
        ...newCollect,
        images: newCollect.images.concat(imageUrls),
      };

      await updateCollect(updatedProduct);

      setNewCollect(updatedProduct);
    } else {
      await createCollect(newCollect);
    }
  };

  useEffect(() => {
    const updateCollectWithImages = async () => {
      await updateCollect();
      setIsSubmitting(false);
      push('/');
    };

    if (
      query.id &&
      newCollect.images &&
      newCollect.images.length > 0 &&
      isSubmitting
    ) {
      updateCollectWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCollect.images, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newCollect.images];
    updatedImageUrls.splice(index, 1);
    setNewCollect({ ...newCollect, images: updatedImageUrls });
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
    const imageToDelete = newCollect.images[index];
    const fileName = imageToDelete.split('/').pop();

    // Actualiza el estado de newCollect con las imágenes actualizadas
    const updatedImageUrls = newCollect.images.filter(
      (imageUrl) => imageUrl !== imageToDelete
    );
    setNewCollect({ ...newCollect, images: updatedImageUrls });

    // Elimina el archivo de la imagen del bucket de S3
    const params = {
      Bucket: env.awsBucket,
      Key: `${idCollect.id}/${fileName}`,
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        console.error('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);

        await updateCollect({ ...newCollect, images: updatedImageUrls });
        push('/');
      }
    });
  }

  return (
    <div className='background-image1 flex h-full min-h-[70vh] justify-center py-5 scrollbar-hide'>
      <form onSubmit={handleSubmit} className='self-center'>
        <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
          {/* Recolector card */}
          {newCollect.collector == null ? null : (
            <div className='flex min-h-[375px] min-w-[340px] flex-col justify-center gap-2 rounded-lg bg-white p-4 text-black'>
              <div className='flex flex-row justify-between '>
                <h4>Recolector: </h4>
                <label id='collector' className='text-sm'>
                  {newCollect.collector[0].firstName +
                    ' ' +
                    newCollect.collector[0].lastName +
                    ' ' +
                    newCollect.collector[0].secondLastName}
                </label>
              </div>
              <div className='flex flex-row justify-between'>
                <h4>Placa:</h4>
                <label id='plate' className='text-md'>
                  {newCollect.collector[0].truck.plate}
                </label>
              </div>
              <div className='flex flex-row justify-between'>
                <h4>Estado del vehiculo:</h4>
                <label id='status' className='text-md'>
                  {newCollect.collector[0].status == 1 ? 'En camino' : 'Visto'}
                </label>
              </div>
              <div className='flex flex-row justify-between'>
                <h4>Tiempo estimado llegada</h4>
                <label id='time' className='text-md'>
                  {newCollect.time} hrs
                </label>
              </div>
              <div className='flex w-full flex-col items-center justify-center'>
                <h3>Foto del Recolector</h3>
                {newCollect.collector[0].photos.map((image) => (
                  <div key={image} className='mr-4' style={{ width: '100px' }}>
                    <img
                      src={image}
                      alt={image}
                      className='h-full w-full rounded-md object-cover shadow-md'
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Client card */}
          <div className='flex min-w-[340px] flex-col justify-center gap-2 rounded-lg bg-white p-4 text-black'>
            <div>
              <h3 id='user'>
                <h3 id='user'>
                  {query.id && newCollect.user && newCollect.user.length > 0
                    ? `${newCollect.user[0].firstName} ${newCollect.user[0].lastName} ${newCollect.user[0].secondLastName}`
                    : 'USUARIO'}
                </h3>
              </h3>
            </div>
            {query.id &&
            newCollect.user &&
            newCollect.user.length > 0 &&
            newCollect.user[0].location &&
            isDataLoaded ? (
              <div className='flex flex-row justify-between'>
                <a
                  className='text-blue-400 hover:text-blue-600'
                  href={`https://www.google.com/maps?q=${newCollect.user[0].location.latitude},${newCollect.user[0].location.longitude}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Ubicacion
                </a>
              </div>
            ) : null}

            <div className='flex flex-row justify-between'>
              <h4 className=' text-black'>Cantidad de baldes :</h4>
              <input
                id='buckets'
                type='number'
                onChange={handleChange}
                value={newCollect.buckets}
                min={1}
                required
                className=' w-16 rounded-lg bg-green-300 text-center text-lg text-black'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className=' text-black'>Descripcion:</h4>
              <div className='text-center'>
                <textarea
                  id='description'
                  onChange={handleChange}
                  value={newCollect.description}
                  className=' h-20 w-5/6 rounded-lg border border-black bg-green-300 text-left text-black'
                  placeholder='Algo que quieras agregar?'
                ></textarea>
              </div>
            </div>
            <div className='text-center'>
              <button type='submit' className='rounded-full bg-[#85A547]'>
                <Image
                  width={150}
                  height={150}
                  className='p-4 text-center'
                  src='/images/check.png'
                  alt='imagen de un check'
                ></Image>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export const getServerSideProps = withSession(async function (context) {
  const { req } = context;
  const user = req.session.get('user');

  // Verifica si el usuario no ha iniciado sesión
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookie = context.req.headers.cookie;

  // Busca los datos del usuario
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  // Si la respuesta es OK, extrae los datos del usuario y verifica su tipo
  if (userRes.ok) {
    const userData = await userRes.json();

    // Comprueba si el usuario tiene el tipo 'admin' o 'collector'
    if (userData.type !== 'user_normal' && userData.type !== 'user_superior') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    // Realiza la solicitud a '/api/env'
    const res = await fetch(`${apiUrl}/api/env`);
    const env = await res.json();

    return {
      props: {
        env,
        user,
      },
    };
  } else {
    // Si la respuesta no es OK, redirige al usuario a la página de inicio
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});
