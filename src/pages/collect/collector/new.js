/* eslint-disable unused-imports/no-unused-vars */
import { S3 } from 'aws-sdk';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
    buckets: 1,
    description: '',
    time: '',
    fault: 0,
    images: query.id ? [''] : [],
  });
  const getCollect = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/collects/${query.id}`);
      const apiCollect = await res.json();
      setIdCollect({ id: apiCollect._id });
      setCollectImages(apiCollect.images);
      setNewCollect((prevCollect) => ({
        collector: prevCollect.collector
          ? prevCollect.collector
          : apiCollect.collector,
        user: apiCollect.user,
        status: apiCollect.status,
        points: apiCollect.points,
        buckets: apiCollect.buckets,
        description: apiCollect.description,
        time: apiCollect.time,
        fault: apiCollect.fault,
        images: apiCollect.images,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData && userData.idUser) {
      console.log('entrando al if de userData');
      setNewCollect((prevCollect) => ({
        ...prevCollect,
        collector: userData.idUser,
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
      toast.error('Ocurrión un error al crear el registro.');
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
      toast.error('Ocurrión un error al crear el registro.');
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
      await createCollect();
    }
  };

  useEffect(() => {
    const updateCollectWithImages = async () => {
      await updateCollect();
      setIsSubmitting(false);
      // push('/collect/collector/list');
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
        push('/collect/user/list');
      }
    });
  }

  return (
    <div className='flex h-full min-h-[70vh] justify-center bg-black py-5 scrollbar-hide'>
      <form onSubmit={handleSubmit} className='self-center'>
        <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
          {/* Client card */}
          <div className='flex  min-w-[340px] flex-col justify-center gap-2 bg-gray-600 p-4 text-white'>
            <div>
              <h3 id='user'>
                <h3 id='user'>
                  {newCollect.user
                    ? `${newCollect.user[0].firstName} ${newCollect.user[0].lastName} ${newCollect.user[0].secondLastName}  `
                    : null}
                </h3>
              </h3>
            </div>
            {/* {query.id &&
            newCollect.user &&
            newCollect.user.length > 0 &&
            newCollect.user[0].location &&
            isDataLoaded ? (
              <div className='flex flex-row justify-between'>
                
              </div>
            ) : null} */}

            <div className='flex flex-row justify-between'>
              <h4 className=' text-white'>Cantidad de baldes :</h4>
              <input
                id='buckets'
                type='number'
                onChange={handleChange}
                value={newCollect.buckets}
                disabled
                min={1}
                className=' w-16 bg-white text-center text-lg text-black'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className=' text-white'>Descripcion:</h4>
              <div className='text-center'>
                <textarea
                  id='description'
                  onChange={handleChange}
                  value={newCollect.description}
                  disabled
                  className=' h-20 w-5/6 rounded-lg border border-black text-left text-black'
                  placeholder='Algo que quieras agregar?'
                ></textarea>
              </div>
            </div>
            <div className='flex flex-row justify-evenly  '>
              <button
                onClick={() => {
                  setNewCollect((prevCollect) => ({
                    ...prevCollect,
                    fault: prevCollect.fault - 10,
                  }));
                }}
                className='w-fit rounded-full bg-red-500 py-2 px-4 font-bold text-white '
              >
                Penalizar
              </button>
              <button
                onClick={() => {
                  setNewCollect((prevCollect) => ({
                    ...prevCollect,
                    fault: prevCollect.fault + 10,
                  }));
                }}
                className='w-fit rounded-full bg-primary py-2 px-4 font-bold text-white '
              >
                Quitar Penalizacion
              </button>
            </div>
            <p className='text-center text-white'>
              {'Penalizacion de: ' + newCollect.fault}
            </p>
          </div>
          {/* Recolector card */}
          {newCollect.collector ? (
            <div className='flex w-[90vw] flex-col justify-center gap-5 rounded-xl bg-secondary p-4 font-secondary sm:h-fit sm:w-[300px] '>
              <div className='flex flex-row justify-between gap-1'>
                <p className='flex h-14 w-32 items-center justify-center rounded-xl bg-blue-400 text-2xl font-semibold text-white '>
                  {newCollect.status == 1
                    ? 'Mandado'
                    : newCollect.status == 2
                    ? 'En camino'
                    : 'Finalizado'}
                </p>
                {query.id &&
                newCollect.user &&
                newCollect.user.length > 0 &&
                newCollect.user[0].location &&
                isDataLoaded ? (
                  <div className='flex flex-row justify-between'>
                    <a
                      className='flex h-14 w-32 items-center justify-center rounded-xl bg-primary text-center text-2xl font-semibold text-white '
                      href={`https://www.google.com/maps?q=${newCollect.user[0].location.latitude},${newCollect.user[0].location.longitude}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Ubicacion
                    </a>
                  </div>
                ) : null}
              </div>
              <div className='flex flex-col gap-4'>
                <div className='items-start'>
                  <h1 className='text-center font-secondary text-white sm:text-3xl sm:font-normal '>
                    Hora estimada de llegada
                  </h1>
                </div>
                <div className='flex justify-center'>
                  <input
                    className='h-14 w-32  text-center text-2xl sm:w-32'
                    type='number'
                    id='time'
                    min='0'
                    max='2359'
                    placeholder='HH:MM'
                    value={newCollect.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <div>
                  <button
                    type='submit'
                    onClick={() => {
                      setNewCollect((prevCollect) => ({
                        ...prevCollect,
                        status: 2,
                      }));
                    }}
                    className='h-14 w-full rounded-xl bg-primary text-3xl font-bold text-white'
                  >
                    VAMOS
                  </button>
                  <button
                    type='submit'
                    className='mt-5 h-14 w-full rounded-xl bg-primary text-3xl font-bold text-white'
                    onClick={() => {
                      setNewCollect((prevCollect) => ({
                        ...prevCollect,
                        status: 3,
                      }));
                    }}
                  >
                    FINALIZADO
                  </button>
                </div>
                {/* <div>
                  <button className='h-14 w-full rounded-xl bg-primary text-3xl font-bold text-white'>
                    YA LLEGUE
                  </button>
                </div> */}
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

//getserverSideProps
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
