/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Loading from '../../../components/Loading';

export default function NewShop() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idShop, setIdShop] = useState({
    id: '',
  });
  const [shopImages, setShopImages] = useState([]);
  const [newShop, setNewShop] = useState({
    user: {},
    point: {},
    quantity: 1,
    status: '1',
    images: [],
  });
  const getAffiliate = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/cart/points/${query.id}`);
      const shop = data;
      setIdShop({ id: shop._id });
      setShopImages(shop.images);
      setNewShop({
        user: shop.user,
        point: shop.point,
        quantity: shop.quantity,
        status: shop.status,
        images: shop.images,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getAffiliate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  // eslint-disable-next-line unused-imports/no-unused-vars
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'images') {
      setNewShop({ ...newShop, [id]: [value] });
    } else if (id === 'status') {
      setNewShop({ ...newShop, [id]: value === '1' ? '1' : '0' });
    } else {
      setNewShop({ ...newShop, [id]: value });
    }
  };

  const updateShop = async (shop) => {
    try {
      await fetch(`${apiUrl}/api/cart/points/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shop),
      });
      push('/point/list');
    } catch (error) {
      toast.error('Algo salio mal');
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
    const imageToDelete = newShop.images[index];
    const fileName = imageToDelete.split('/').pop();
    const key = `${idShop.id}/${fileName}`;

    try {
      await fetch(`${apiUrl}/api/s3/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      console.log('Image deleted from S3');

      const updatedImageUrls = newShop.images.filter(
        (imageUrl) => imageUrl !== imageToDelete
      );
      setNewShop({ ...newShop, images: updatedImageUrls });
      await updateShop({ ...newShop, images: updatedImageUrls });
      push('/point/carrito');
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
          idShop.id.toString()
        );

        const update = {
          ...newShop,
          images: [...newShop.images, imageUrl],
          status: '1', // Cambia el estado a uno cuando se sube una nueva imagen
        };

        await updateShop(update);
        setNewShop(update);
      }
    }
    toast.success('Su orden esta procesandose!');
    push('/point/carrito');
  };

  useEffect(() => {
    const updateaffiliateWithImages = async () => {
      await updateShop();
      setIsSubmitting(false);
      push('/');
    };

    if (query.id && newShop.images.length > 0 && isSubmitting) {
      updateaffiliateWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newShop.images, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newShop.images];
    updatedImageUrls.splice(index, 1);
    setNewShop({ ...newShop, images: updatedImageUrls });
  }

  return (
    <div className='background-plantas  flex h-full min-h-[70vh] flex-col items-center justify-center gap-5 md:flex-row'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] rounded-lg bg-white p-8 pb-[0px]'>
        <h1>{query.id ? 'Comprobante Pago' : 'New Affiliate'}</h1>
        <form onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            {query.id ? (
              <div>
                <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                  Imagenes
                </label>
                <input
                  type='file'
                  id='images'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedImages([...selectedImages, ...e.target.files])
                  }
                  class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                  max='5145728' // 5MB en bytes
                />
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    class='relative mr-2 mb-2 inline-block w-full'
                  >
                    <Image
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
                {shopImages.length > 0 ? (
                  <div>
                    <label class='mb-2 mt-2 block rounded-lg text-sm font-medium text-gray-500 dark:text-white'>
                      Imagenes existentes
                    </label>
                    <div class='flex flex-wrap'>
                      {shopImages.map((image, index) => (
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
                  'Subir Comprobante'
                ) : (
                  'Verificate'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='mt-[5%] mb-[5%] h-full w-[300px] rounded-lg bg-white p-8 pb-[0px]'>
        <h1>Qr banco comprobante</h1>
        <div className='my-5'>
          <img
            src={newShop.point.images}
            alt='QR banco'
            height={300}
            width={300}
            className='rounded-lg'
          />
        </div>
      </div>
    </div>
  );
}
