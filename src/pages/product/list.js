/* eslint-disable @next/next/no-img-element */
//import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function ListProducts({ products }) {
  const router = useRouter();
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

  if (!products) {
    return (
      <div className='text-center'>
        <h1>No hay productos</h1>
        <div className='mt-4'>
          <button
            className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            onClick={() => router.push('/register/registerProduct')}
          >
            Crear producto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='h-full min-h-[70vh]'>
      <div className='ml-5 text-start'>
        <button
          className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          onClick={() => router.push('/product/new')}
        >
          Crear Producto
        </button>
      </div>
      <div className='container mx-auto flex h-full justify-center  '>
        <div className='my-5 flex flex-row flex-wrap place-content-center gap-5 sm:my-0'>
          {products.map((product, productIndex) => (
            <div
              className='min-w-[200px] overflow-hidden rounded-lg bg-gray-300 shadow-xl'
              key={product._id}
            >
              <div className='p-4'>
                <h4 className='text-center text-xl font-semibold'>
                  {product.nameproduct}
                </h4>
                <p className='text-gray-600'>{product.description}</p>
                <p className='text-gray-600'>
                  Puntos de precio: {product.price_points}
                </p>
                <p className='text-gray-600'>
                  Estado:{' '}
                  <strong
                    className={
                      product.status === 1 ? 'text-primary' : 'text-red-500'
                    }
                  >
                    {product.status === 1 ? 'Disponible' : 'No disponible'}
                  </strong>
                </p>
                <p className='text-gray-600'>Cantidad: {product.ammount}</p>
                <div className='relative m-auto mt-3 h-[100] w-[100px]'>
                  <div
                    className='scroll-snap-type-x flex items-center overflow-auto scrollbar-hide'
                    data-id={productIndex}
                    style={{ scrollSnapType: 'x mandatory' }}
                    ref={(el) => (sliderRefs.current[productIndex] = el)}
                  >
                    {product.images.map((image) => (
                      <div
                        key={image}
                        className='mr-4 flex-none'
                        style={{ width: '100px' }}
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
                        onClick={() => scrollSlider(productIndex, 'left')}
                      >
                        {'<'}
                      </button>
                      <button
                        className='inline-block h-8 w-8 rounded-full bg-black bg-opacity-50 text-white focus:outline-none'
                        onClick={() => scrollSlider(productIndex, 'right')}
                      >
                        {'>'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className='mb-4 flex justify-center'>
                <button
                  className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
                  onClick={() => router.push(`/product/${product._id}`)}
                >
                  Ver
                </button>
                <button
                  className='ml-4 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50'
                  onClick={() => router.push(`/product/${product._id}/edit`)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/products`);
  const products = await res.json();
  return {
    props: {
      products,
    },
  };
};
