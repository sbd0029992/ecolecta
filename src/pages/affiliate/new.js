/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

export default function Newaffiliate() {
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
    url: '',
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
        url: affiliate.url,
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
      push('/affiliate/list');
    } catch (error) {
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
    const imageToDelete = newAffiliate.images[index];
    const fileName = imageToDelete.split('/').pop();
    const key = `${idAffiliate.id}/${fileName}`;

    try {
      await fetch(`${apiUrl}/api/s3/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      console.log('Image deleted from S3');

      const updatedImageUrls = newAffiliate.images.filter(
        (imageUrl) => imageUrl !== imageToDelete
      );
      setNewAffiliate({ ...newAffiliate, images: updatedImageUrls });
      await updateAffiliate({ ...newAffiliate, images: updatedImageUrls });
      push('/affiliate/list');
    } catch (error) {
      console.error('Error deleting image from S3:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (query.id) {
      if (selectedImages[0]) {
        const imageUrl = await uploadToS3(
          selectedImages[0],
          idAffiliate.id.toString()
        );

        const updatedAffiliate = {
          ...newAffiliate,
          images: [...newAffiliate.images, imageUrl],
        };

        await updateAffiliate(updatedAffiliate);
        setNewAffiliate(updatedAffiliate);
      } else {
        await updateAffiliate(newAffiliate);
      }
    } else {
      await createAffiliate();
    }

    push('/affiliate/list');
  };

  useEffect(() => {
    const updateaffiliateWithImages = async () => {
      await updateAffiliate();
      push('/affiliate/list');

      setIsSubmitting(false);
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
    document.getElementById('images').value = '';
  }

  return (
    <div className='background-plantas flex h-full min-h-[70vh] items-center justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] rounded-lg bg-white p-8 pb-[0px]'>
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
                class='block w-full rounded-lg border border-green-300 bg-green-200 p-2.5 text-sm text-gray-900'
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
                class='block w-full rounded-lg border border-green-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Description'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Url
              </label>
              <input
                type='text'
                id='url'
                value={newAffiliate.url}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Url Link'
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
                  onColor='#62D37F'
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

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const envRes = await fetch(`${apiUrl}/api/env`);
  const env = await envRes.json();
  const affiliatesRes = await fetch(`${apiUrl}/api/affiliates`);
  const affiliates = await affiliatesRes.json();
  const cookie = context.req.headers.cookie;
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  if (userRes.ok) {
    const userData = await userRes.json();
    if (userData.type !== 'admin' && userData.type !== 'affiliate') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        env,
        affiliates,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
