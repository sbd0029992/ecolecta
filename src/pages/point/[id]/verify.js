/* eslint-disable @next/next/no-img-element */
import { S3 } from 'aws-sdk';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function NewShop({ env }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
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
  async function uploadToS3(file, shopId) {
    if (!s3) {
      console.error('S3 client is not initialized');
      return;
    }
    const fileName = `${shopId}/${file.name}`;
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

  const createShop = async () => {
    try {
      await fetch(`${apiUrl}/api/cart/points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShop),
      });
    } catch (error) {
      console.log(error);
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
      push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (query.id) {
      const stringId = idShop.id.toString();
      const imageUrls = (
        await Promise.all(
          selectedImages.map(async (file) => {
            const imageUrl = await uploadToS3(file, stringId);
            return imageUrl;
          })
        )
      ).filter((url) => url);

      const updatedAffiliate = {
        ...newShop,
        images: newShop.images.concat(imageUrls),
      };

      await updateShop(updatedAffiliate);
      setNewShop(updatedAffiliate);
    } else {
      await createShop(newShop);
    }
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
    const imageToDelete = newShop.images[index];
    const fileName = imageToDelete.split('/').pop();

    // Actualiza el estado de newShop con las imágenes actualizadas
    const updatedImageUrls = newShop.images.filter(
      (imageUrl) => imageUrl !== imageToDelete
    );
    setNewShop({ ...newShop, images: updatedImageUrls });

    // Elimina el archivo de la imagen del bucket de S3
    const params = {
      Bucket: env.awsBucket,
      Key: `${idShop.id}/${fileName}`,
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        console.error('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);

        // Actualiza los datos en la base de datos con el affiliateo actualizado
        await updateShop({ ...newShop, images: updatedImageUrls });
      }
    });
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
                  Images
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
                      Existing Images
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
                class='m-[0px] mt-2 h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                {query.id ? 'Subir Comprobante' : 'Create Affiliate'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className='mt-[5%] mb-[5%] h-full w-[300px] rounded-lg bg-white p-8 pb-[0px]'>
        <h1>Qr banco Comprobante</h1>
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
