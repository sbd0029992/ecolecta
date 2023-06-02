import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { toast } from 'react-toastify';

import Loading from '../../../components/Loading';

export default function UserRegister() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [newTruck, setNewTruck] = useState({
    plate: '',
    chasis: '',
    model: '',
    brand: '',
    status: '1',
  });

  const getTruck = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/trucks/${query.id}`);
      const { truck } = await res.json();
      setNewTruck({
        plate: truck.plate,
        chasis: truck.chasis,
        model: truck.model,
        brand: truck.brand,
        status: truck.status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query.id) {
      getTruck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewTruck({ ...newTruck, [id]: value });
  };

  const createTruck = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trucks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruck),
      });
      if (!response.ok) {
        toast.error('Ocurrio un error');
      } else {
        toast.success('Camion creado con éxito!');
        push('/truck/list');
      }
    } catch (error) {
      toast.error('Error al crear camion');
      console.log(error);
    }
  };

  const updateTruck = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/trucks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruck),
      });
      if (!response.ok) {
        toast.error('Ocurrio un error');
      } else {
        toast.success('Camion actualizado con éxito!');
        push('/truck/list');
      }
    } catch (error) {
      toast.error('Ocurrio un error');
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (query.id) {
      await updateTruck();
      await push('/register/truck/list');
    } else {
      await createTruck(newTruck);
      console.log(newTruck);
      await push('/register/truck/list');
    }
  };

  return (
    <div className='background-tierra flex justify-center'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] rounded-lg bg-white p-8 pb-[0px] dark:bg-black'>
        <h1 className='text-black dark:text-white'>
          {query.id ? 'Edit Truck' : 'Register Truck'}
        </h1>
        <form class='formulary' onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                PLACA
              </label>
              <input
                name='plate'
                id='plate'
                value={newTruck.plate}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su placa'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                CHASIS
              </label>
              <input
                type='text'
                id='chasis'
                value={newTruck.chasis}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su chasis'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                MODELO
              </label>
              <input
                type='number'
                id='model'
                value={newTruck.model}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Inserte el año del modelo'
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-300 dark:text-white'>
                MARCA
              </label>
              <input
                type='text'
                id='brand'
                value={newTruck.brand}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-green-300 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su marca'
                required
              />
            </div>
            {query.id ? (
              <div class='flex flex-row justify-between'>
                <div>
                  <label className='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                    DISPONIBLE
                  </label>
                </div>

                <Switch
                  checked={newTruck.status === 1}
                  onChange={(checked) =>
                    setNewTruck({ ...newTruck, status: checked ? 1 : 0 })
                  }
                  onColor='#44FA09'
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

  const collectRes = await fetch(`${apiUrl}/api/users/truck`);

  const collectors = await collectRes.json();

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
        collectors,
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
