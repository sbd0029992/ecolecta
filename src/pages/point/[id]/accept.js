/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

export default function Accept() {
  const { query, push } = useRouter();
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
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/points/${query.id}`
      );
      const shop = data;
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

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const createShop = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShop),
      });
      toast.success('Realizado con exito!');
    } catch (error) {
      toast.error('Ocurrio un error');
      console.log(error);
    }
  };

  const updateShop = async (shop) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cart/points/${query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(shop),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = errorData.error || 'Ocurrió un error';
        alert(errorMessage);
      } else {
        toast.success('Actualizacion realizado con éxito!');
        push('/point/lisetSend');
      }
    } catch (error) {
      toast.error('Ocurrio un error');
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.id) {
      await updateShop(newShop);
    } else {
      await createShop(newShop);
    }
  };

  return (
    <div className='background-plantas  flex h-full min-h-[70vh] flex-col items-center justify-center gap-5 md:flex-row'>
      <div className=' mt-[5%] mb-[5%] h-full w-[300px] rounded-lg bg-white p-8 pb-[0px]'>
        <h1>{query.id ? 'Comprobante Pago' : 'New Affiliate'}</h1>
        <h4>{newShop.point?.name}</h4>
        <h4 className='text-gray-500 '>
          {newShop.status === 1
            ? 'Pendiente'
            : newShop.status === 2
            ? 'Aceptado'
            : 'Denegado'}{' '}
        </h4>
        <form onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Imagenes existentes
              </label>
              <div class='flex flex-wrap'>
                {shopImages.map((image, index) => (
                  <div
                    key={index}
                    class='relative mr-2 mb-2 inline-block w-full'
                    onClick={() => openModal(image)}
                  >
                    <img
                      src={image}
                      alt={image}
                      class='h-30 w-[300px] cursor-pointer rounded-lg shadow-md'
                      height={100}
                      width={100}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='flex justify-evenly'>
              <button
                type='submit'
                className='rounded bg-green-600 px-3 py-2 font-semibold text-white hover:bg-green-600'
                onClick={() => {
                  setNewShop((prevShop) => ({
                    ...prevShop,
                    status: 2,
                  }));
                }}
              >
                Aceptado
              </button>
              <button
                type='submit'
                className='rounded bg-red-500 px-3 py-2 font-semibold text-white hover:bg-red-600'
                onClick={() => {
                  setNewShop((prevShop) => ({
                    ...prevShop,
                    status: 3,
                  }));
                }}
              >
                Denegado
              </button>
            </div>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          },
        }}
      >
        <img
          src={selectedImage}
          alt={selectedImage}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        <button
          onClick={closeModal}
          style={{ position: 'absolute', top: '10px', right: '10px' }}
        >
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
