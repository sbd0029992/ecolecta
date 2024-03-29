/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';

export default function NewPoint() {
  const router = useRouter();
  const { query, push } = router;
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPoint, setIdPoint] = useState({
    id: '',
  });
  const [pointImages, setPointImages] = useState([]);
  const [newPoint, setNewPoint] = useState({
    name: '',
    price: '',
    value: 1,
    status: '1',
    images: query.id ? [''] : [],
  });

  const getPoint = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/points/${query.id}`);
      const point = await res.json();
      setIdPoint({ id: point._id });
      setPointImages(point.images);
      setNewPoint({
        name: point.name,
        value: point.value,
        price: point.price,
        status: point.status,
        images: point.images,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getPoint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'images') {
      setNewPoint({ ...newPoint, [id]: [value] });
    } else {
      setNewPoint({ ...newPoint, [id]: value });
    }
  };

  const createPoint = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoint),
      });
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Ocurrió un error';
        alert(errorMessage);
      } else {
        toast.success('Puntos creada con éxito!');
        push('/point/list');
      }
    } catch (error) {
      toast.error('Ocurrió un error intente denuevo');
      console.log(error);
    }
  };

  const updatePoint = async (point) => {
    try {
      const response = await fetch(`${apiUrl}/api/points/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(point),
      });
      if (!response.ok) {
        toast.error('Ocurrió un error');
      } else {
        toast.success('Puntos Actualizados.');
        push('/point/list');
      }
    } catch (error) {
      toast.error('Ocurrio un error');
      console.log(error);
    }
  };
  // Función para subir una imagen a S3 y devolver la URL
  async function uploadToS3(file, id) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    try {
      const response = await fetch(`${apiUrl}/api/s3/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.imageUrl; // Asume que tu API devuelve la URL de la imagen
    } catch (error) {
      console.error('Error uploading to S3:', error);
    }
  }

  async function handleRemoveImageS3(index) {
    const imageToDelete = newPoint.images[index];
    const fileName = imageToDelete.split('/').pop();
    const key = `${idPoint.id}/${fileName}`;

    try {
      await fetch(`${apiUrl}/api/s3/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      console.log('Image deleted from S3');

      const updatedImageUrls = newPoint.images.filter(
        (imageUrl) => imageUrl !== imageToDelete
      );
      setNewPoint({ ...newPoint, images: updatedImageUrls });
      await updatePoint({ ...newPoint, images: updatedImageUrls });
      push('/point/list');
    } catch (error) {
      console.error('Error deleting image from S3:', error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    if (query.id) {
      // Si hay una imagen seleccionada
      if (selectedImages[0]) {
        const imageUrl = await uploadToS3(
          selectedImages[0],
          idPoint.id.toString()
        );

        const updatedPoint = {
          ...newPoint,
          images: [...newPoint.images, imageUrl],
        };

        await updatePoint(updatedPoint);
        setNewPoint(updatedPoint);
      } else {
        await updatePoint(newPoint);
      }
    } else {
      await createPoint();
    }
    push('/point/list');
  };

  useEffect(() => {
    const updateProductWithImages = async () => {
      await updatePoint();
      setIsSubmitting(false);
    };

    if (query.id && newPoint.images.length > 0 && isSubmitting) {
      updateProductWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPoint.images, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newPoint.images];
    updatedImageUrls.splice(index, 1);
    setNewPoint({ ...newPoint, images: updatedImageUrls });
    document.getElementById('images').value = '';
  }

  return (
    <div className='background-plantas flex justify-center'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] rounded-lg bg-white p-8 pb-[0px] dark:bg-black'>
        <h1 className='text-black dark:text-white'>
          {query.id ? 'Edit Point' : 'New Point'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Nombre punto
              </label>
              <input
                type='text'
                id='name'
                value={newPoint.name}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Point Name'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Valor
              </label>
              <input
                type='number'
                min='1'
                max='9999'
                id='value'
                value={newPoint.value}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Value Point'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Precio
              </label>
              <input
                type='number'
                min='0'
                id='price'
                value={newPoint.price}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Price Points'
                required
              />
            </div>
            {query.id ? (
              <div class='flex flex-row justify-between'>
                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                    Disponible
                  </label>
                </div>

                <Switch
                  checked={newPoint.status === 1}
                  onChange={(checked) =>
                    setNewPoint({ ...newPoint, status: checked ? 1 : 0 })
                  }
                  onColor='#26AD5F'
                  onHandleColor='#ffffff'
                  offColor='#CCCCCC'
                  offHandleColor='#ffffff'
                  handleDiameter={22}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={28}
                  width={50}
                  className='mt-1 mb-4'
                />
              </div>
            ) : null}

            {query.id ? (
              <div>
                <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  Imagen
                </label>
                <input
                  type='file'
                  id='images'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedImages([...selectedImages, ...e.target.files])
                  }
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                  multiple
                  max='5145728' // 5MB en bytes
                />
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    class='relative mr-2 mb-2 inline-block w-full'
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
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
                {pointImages.length > 0 ? (
                  <div>
                    <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                      Imagenes existentes
                    </label>
                    <div class='flex flex-wrap'>
                      {pointImages.map((image, index) => (
                        <div
                          key={index}
                          class='relative mr-2 mb-2 inline-block w-full'
                        >
                          <img
                            src={image}
                            alt={image}
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
            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={loading}
                className={`rounded-full ${
                  !loading ? 'h-20 w-40 rounded-lg bg-[#36bd53]' : ''
                }`}
              >
                {loading ? (
                  <Loading />
                ) : query.id ? (
                  'Editar Producto'
                ) : (
                  'Crear Producto'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const cookie = context.req.headers.cookie;

  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  if (userRes.ok) {
    const userData = await userRes.json();

    if (userData.type !== 'admin') {
      return {
        redirect: {
          destination: '/',

          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/',

        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
