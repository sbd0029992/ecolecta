/* eslint-disable @next/next/no-img-element */
import { S3 } from 'aws-sdk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

export default function Newaffiliate({ env }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idAffiliate, setIdAffiliate] = useState({
    id: '',
  });
  const [affiliateImages, setAffiliateImages] = useState([]);
  const [newAffiliate, setNewAffiliate] = useState({
    name: '',
    description: '',
    status: '1',
    images: query.id ? [''] : [],
  });

  const getAffiliate = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/affiliates/${query.id}`);
      const affiliate = await res.json();
      setIdAffiliate({ id: affiliate._id });
      setAffiliateImages(affiliate.images);
      setNewAffiliate({
        name: affiliate.name,
        description: affiliate.description,
        status: affiliate.status,
        images: affiliate.images,
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
      setNewAffiliate({ ...newAffiliate, [id]: [value] });
    } else if (id === 'status') {
      setNewAffiliate({ ...newAffiliate, [id]: value === '1' ? '1' : '0' });
    } else {
      setNewAffiliate({ ...newAffiliate, [id]: value });
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
  async function uploadToS3(file, affiliateId) {
    if (!s3) {
      console.error('S3 client is not initialized');
      return;
    }
    const fileName = `${affiliateId}/${file.name}`;
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

  const createAffiliate = async () => {
    try {
      await fetch(`${apiUrl}/api/affiliates`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAffiliate),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateAffiliate = async (affiliate) => {
    try {
      await fetch(`${apiUrl}/api/affiliates/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(affiliate),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (query.id) {
      const stringId = idAffiliate.id.toString();
      const imageUrls = (
        await Promise.all(
          selectedImages.map(async (file) => {
            const imageUrl = await uploadToS3(file, stringId);
            return imageUrl;
          })
        )
      ).filter((url) => url);

      const updatedAffiliate = {
        ...newAffiliate,
        images: newAffiliate.images.concat(imageUrls),
      };

      await updateAffiliate(updatedAffiliate);

      setNewAffiliate(updatedAffiliate);
      await push('/affiliate/list');
    } else {
      await createAffiliate(newAffiliate);
      await push('/affiliate/list');
    }
  };

  useEffect(() => {
    const updateaffiliateWithImages = async () => {
      await updateAffiliate();
      setIsSubmitting(false);
      push('/affiliate/list');
    };

    if (query.id && newAffiliate.images.length > 0 && isSubmitting) {
      updateaffiliateWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAffiliate.images, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newAffiliate.images];
    updatedImageUrls.splice(index, 1);
    setNewAffiliate({ ...newAffiliate, images: updatedImageUrls });
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
    const imageToDelete = newAffiliate.images[index];
    const fileName = imageToDelete.split('/').pop();

    // Actualiza el estado de newAffiliate con las imágenes actualizadas
    const updatedImageUrls = newAffiliate.images.filter(
      (imageUrl) => imageUrl !== imageToDelete
    );
    setNewAffiliate({ ...newAffiliate, images: updatedImageUrls });

    // Elimina el archivo de la imagen del bucket de S3
    const params = {
      Bucket: env.awsBucket,
      Key: `${idAffiliate.id}/${fileName}`,
    };
    s3.deleteObject(params, async (err, data) => {
      if (err) {
        console.error('Error deleting image from S3:', err);
      } else {
        console.log('Image deleted from S3:', data);

        // Actualiza los datos en la base de datos con el affiliateo actualizado
        await updateAffiliate({ ...newAffiliate, images: updatedImageUrls });
        push('/affiliate/list');
      }
    });
  }

  return (
    <div className='flex h-full min-h-[70vh] items-center justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>{query.id ? 'Edit Affiliate' : 'New Affiliate'}</h1>
        <form onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Affiliate Name
              </label>
              <input
                type='text'
                id='name'
                value={newAffiliate.name}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Affiliate Name'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Description
              </label>
              <input
                type='text'
                id='description'
                value={newAffiliate.description}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Description'
                required
              />
            </div>
            {query.id ? (
              <div class='flex flex-row justify-between'>
                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                    Avaliable
                  </label>
                </div>

                <Switch
                  checked={newAffiliate.status === 1}
                  onChange={(checked) =>
                    setNewAffiliate({
                      ...newAffiliate,
                      status: checked ? 1 : 0,
                    })
                  }
                  onColor='#85A547'
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
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
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
                {affiliateImages.length > 0 ? (
                  <div>
                    <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                      Existing Images
                    </label>
                    <div class='flex flex-wrap'>
                      {affiliateImages.map((image, index) => (
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
                {query.id ? 'Edit Affiliate' : 'Create Affiliate'}
              </button>
            </div>
          </div>
        </form>
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
