import Error from 'next/error';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AffiliateDetail() {
  const { query, push } = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sliderRefs = useRef([]);
  const { data: affiliate, error } = useSWR(
    `/api/affiliates/${query.id}`,
    fetcher
  );
  useEffect(() => {
    if (affiliate) {
      sliderRefs.current[affiliate.id] =
        sliderRefs.current[affiliate.id] || null;
    }
  }, [affiliate]);

  const scrollSlider = (affiliateIndex, direction) => {
    const slider = sliderRefs.current[affiliateIndex];
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
      await fetch(`/api/affiliates/${query.id}`, {
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
      push('/affiliate/list');
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }

  if (!affiliate) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='background-plantas h-full min-h-[70vh] p-6'>
      <div className='ml-5 text-start'>
        <button
          className='rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
          onClick={() => push('/affiliate/list')}
        >
          Lista de Afiliados
        </button>
      </div>
      <div className='mt-2 flex h-full flex-col items-center justify-center'>
        {isLoading && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-gray-100'></div>
          </div>
        )}
        <div className='min-w-min'>
          <h1 className='mb-4 rounded-full bg-green-700 text-center text-3xl font-bold text-white'>
            {affiliate.name}
          </h1>
          <div className='mb-4 grid grid-cols-1 overflow-hidden rounded-lg bg-white shadow-md md:grid-cols-2'>
            <div className='relative h-[100] w-[200px]'>
              <div
                className='scroll-snap-type-x flex items-center overflow-auto scrollbar-hide'
                data-id={affiliate.id}
                style={{ scrollSnapType: 'x mandatory' }}
                ref={(el) => (sliderRefs.current[affiliate.id] = el)}
              >
                {affiliate.images.map((image) => (
                  <div
                    key={image}
                    className='mr-4 flex-none'
                    style={{ width: '200px' }}
                  >
                    <Image
                      src={image}
                      alt={affiliate.name}
                      className='h-full w-full rounded-md object-cover shadow-md'
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
              {affiliate.images.length > 1 && (
                <div className='absolute top-1/2 left-0 flex w-full -translate-y-1/2 transform justify-between'>
                  <button
                    className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                    onClick={() => scrollSlider(affiliate.id, 'left')}
                  >
                    {'<'}
                  </button>
                  <button
                    className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                    onClick={() => scrollSlider(affiliate.id, 'right')}
                  >
                    {'>'}
                  </button>
                </div>
              )}
            </div>
            <div className='p-6'>
              <p className='mb-2 font-medium text-gray-600'>Afiliado</p>
              <p className='mb-4 text-gray-800'>{affiliate.name}</p>
              <p className='mb-2 font-medium text-gray-600'>Description</p>
              <p className='mb-4 text-gray-800'>{affiliate.description}</p>
              <p className='mb-2 font-medium text-gray-600'>
                Estado:
                <strong
                  className={`ml-4 font-medium ${
                    affiliate.status === 1 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {affiliate.status === 1 ? 'Activo' : 'Inactivo'}
                </strong>
              </p>
              <button
                className='mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600'
                onClick={openModal}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {confirm && (
          <div className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='w-80 rounded-lg bg-white p-6 shadow-lg'>
              <p className='mb-4 text-lg'>
                Are you sure you want to delete this affiliate?
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
