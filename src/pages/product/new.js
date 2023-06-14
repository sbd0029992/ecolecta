/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';

export default function NewProduct() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idProduct, setIdProduct] = useState({
    id: '',
  });
  const [productImages, setProductImages] = useState([]);
  const [newProduct, setNewProduct] = useState({
    nameproduct: '',
    description: '',
    price_points: '',
    status: '1',
    ammount: '',
    images: query.id ? [''] : [],
  });

  const getProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/products/${query.id}`);
      const product = await res.json();
      setIdProduct({ id: product._id });
      setProductImages(product.images);
      setNewProduct({
        nameproduct: product.nameproduct,
        description: product.description,
        price_points: product.price_points,
        status: product.status,
        ammount: product.ammount,
        images: product.images,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'images') {
      setNewProduct({ ...newProduct, [id]: [value] });
    } else {
      setNewProduct({ ...newProduct, [id]: value });
    }
  };

  const createProduct = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        toast.error('Ocurrió un error');
      } else {
        toast.success('Producto Creado.');
        push('/product/list');
      }
    } catch (error) {
      toast.error('¡Error al crear producto!');
      console.log(error);
    }
  };

  const updateProduct = async (product) => {
    try {
      const response = await fetch(`${apiUrl}/api/products/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        toast.error('Ocurrió un error');
      } else {
        toast.success('Producto Actualizado.');
        push('/product/list');
      }
    } catch (error) {
      toast.error('¡Error al actualizar el producto!');
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
    const imageToDelete = newProduct.images[index];
    const fileName = imageToDelete.split('/').pop();
    const key = `${idProduct.id}/${fileName}`;

    try {
      await fetch(`${apiUrl}/api/s3/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });
      console.log('Image deleted from S3');

      const updatedImageUrls = newProduct.images.filter(
        (imageUrl) => imageUrl !== imageToDelete
      );
      setNewProduct({ ...newProduct, images: updatedImageUrls });
      await updateProduct({ ...newProduct, images: updatedImageUrls });
      push('/product/list');
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
          idProduct.id.toString()
        );

        const updated = {
          ...newProduct,
          images: [...newProduct.images, imageUrl],
        };

        await updateProduct(updated);
        setNewProduct(updated);
      } else {
        await updateProduct(newProduct);
      }
    } else {
      await createProduct();
    }
    push('/product/list');
  };

  useEffect(() => {
    const updateProductWithImages = async () => {
      await updateProduct();
      setIsSubmitting(false);
      push('/product/list');
    };

    if (query.id && newProduct.images.length > 0 && isSubmitting) {
      updateProductWithImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newProduct.images, isSubmitting]);

  // Función para eliminar imágenes seleccionadas
  function handleRemoveImage(index) {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    const updatedImageUrls = [...newProduct.images];
    updatedImageUrls.splice(index, 1);
    setNewProduct({ ...newProduct, images: updatedImageUrls });
  }

  return (
    <div className='background-plantas flex justify-center'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] rounded-lg bg-white p-8 pb-[0px] dark:bg-black'>
        <h1 className='text-black dark:text-white'>
          {query.id ? 'Edit Product' : 'New Product'}
        </h1>
        <form onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Nombre producto
              </label>
              <input
                type='text'
                id='nameproduct'
                value={newProduct.nameproduct}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200 p-2.5 text-sm text-gray-900'
                placeholder='Product Name'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Descripción
              </label>
              <input
                type='text'
                id='description'
                value={newProduct.description}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200  p-2.5 text-sm text-gray-900'
                placeholder='Description'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Precio puntos
              </label>
              <input
                type='number'
                min='0'
                id='price_points'
                value={newProduct.price_points}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200  p-2.5 text-sm text-gray-900'
                placeholder='Price Points'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Cantidad
              </label>
              <input
                type='number'
                id='ammount'
                min='0'
                value={newProduct.ammount}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-200  p-2.5 text-sm text-gray-900'
                placeholder='Ammount Product'
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
                  checked={newProduct.status === 1}
                  onChange={(checked) =>
                    setNewProduct({ ...newProduct, status: checked ? 1 : 0 })
                  }
                  onColor='#33C16F'
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
                  Imagenes
                </label>
                <input
                  type='file'
                  id='images'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedImages([...selectedImages, ...e.target.files])
                  }
                  class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
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
                {productImages.length > 0 ? (
                  <div>
                    <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                      Imagenes existentes
                    </label>
                    <div class='flex flex-wrap'>
                      {productImages.map((image, index) => (
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

//getserverSideProps
export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const cookie = context.req.headers.cookie;

  const productRes = await fetch(`${apiUrl}/api/products`);

  const products = await productRes.json();

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

    return {
      props: {
        products,
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
