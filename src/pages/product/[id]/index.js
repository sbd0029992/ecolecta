/* eslint-disable @next/next/no-img-element */
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductDetail() {
  const { query, push } = useRouter();
  const { data: product, error } = useSWR(`/api/products/${query.id}`, fetcher);
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sliderRefs = useRef([]);

  const scrollSlider = (productIndex, direction) => {
    const slider = sliderRefs.current[productIndex];
    const firstImage = slider.children[0];
    const imageWidth = firstImage.clientWidth;
    const marginRight = parseInt(
      window.getComputedStyle(firstImage).getPropertyValue('margin-right')
    );
    const scrollAmount = imageWidth + marginRight;

    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const deleteProduct = async () => {
    try {
      await fetch(`/api/products/${query.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProduct();
      closeModal();
      push('/product/list');
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }

  if (!product) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='h-full min-h-[70vh]'>
      <div className='ml-5 text-start'>
        <button
          className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={() => push('/product/list')}
        >
          Lista de Productos
        </button>
      </div>
      <div className='flex h-full flex-col items-center justify-center'>
        {isLoading && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-100'></div>
          </div>
        )}
        <div className='min-w-min'>
          <h1 className='mb-4 text-3xl font-bold'>{product.name}</h1>
          <div className='mb-4 grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-md md:grid-cols-2'>
            <div className='relative h-[100] w-[200px]'>
              <div
                className='scroll-snap-type-x flex items-center overflow-auto scrollbar-hide'
                data-id={product.id}
                style={{ scrollSnapType: 'x mandatory' }}
                ref={(el) => (sliderRefs.current[product.id] = el)}
              >
                {product.images.map((image) => (
                  <div
                    key={image}
                    className='mr-4 flex-none'
                    style={{ width: '200px' }}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className='h-full w-full rounded-md object-cover shadow-md'
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
              {product.images.length > 1 && (
                <div className='absolute top-1/2 left-0 flex w-full -translate-y-1/2 transform justify-between'>
                  <button
                    className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                    onClick={() => scrollSlider(product.id, 'left')}
                  >
                    {'<'}
                  </button>
                  <button
                    className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                    onClick={() => scrollSlider(product.id, 'right')}
                  >
                    {'>'}
                  </button>
                </div>
              )}
            </div>
            <div className='p-6'>
              <p className='mb-2 font-medium text-gray-600'>Producto</p>
              <p className='mb-4 text-gray-800'>{product.nameproduct}</p>
              <p className='mb-2 font-medium text-gray-600'>Description</p>
              <p className='mb-4 text-gray-800'>{product.description}</p>
              <div className='mb-4 flex items-center justify-between'>
                <p className='font-medium text-gray-700'>Price Points:</p>
                <p className='font-medium text-gray-700'>
                  {product.price_points}
                </p>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <p className='font-medium text-gray-700'>Stock:</p>
                <p className='font-medium text-gray-700'>{product.ammount}</p>
              </div>

              <p>
                Estado:
                <strong
                  className={`ml-2 font-medium ${
                    product.status === 1 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.status === 1 ? 'Disponible' : 'No disponible'}
                </strong>
              </p>
            </div>
          </div>
          <div className='text-center'>
            <button
              className='mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
              onClick={openModal}
            >
              Delete
            </button>
          </div>
        </div>

        {confirm && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
              <p className='mb-4 text-lg'>
                Are you sure you want to delete this product?
              </p>
              <div className='flex justify-end'>
                <button
                  className='mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600'
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className='rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
