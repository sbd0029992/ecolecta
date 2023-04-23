import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';

export default function UserRegister() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { query, push } = useRouter();
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
      await fetch(`${apiUrl}/api/trucks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruck),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateTruck = async () => {
    try {
      await fetch(`${apiUrl}/api/trucks/${query.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTruck),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className='flex justify-center bg-black'>
      <div className=' mt-[5%] mb-[5%] h-full w-[330px] bg-white p-8 pb-[0px] '>
        <h1>{query.id ? 'Edit Truck' : 'Register Truck'}</h1>
        <form class='formulary' onSubmit={handleSubmit}>
          <div class='mb-6 grid gap-3 '>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Placa
              </label>
              <input
                name='plate'
                id='plate'
                value={newTruck.plate}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su placa'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Chasis
              </label>
              <input
                type='text'
                id='chasis'
                value={newTruck.chasis}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su chasis'
                required
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Modelo
              </label>
              <input
                type='number'
                id='model'
                value={newTruck.model}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Inserte el año del modelo'
              />
            </div>
            <div>
              <label class='mb-2 mt-2 block text-sm font-medium text-gray-500 dark:text-white'>
                Marca
              </label>
              <input
                type='text'
                id='brand'
                value={newTruck.brand}
                onChange={handleChange}
                class='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900'
                placeholder='Inserte su marca'
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
                  checked={newTruck.status === 1}
                  onChange={(checked) =>
                    setNewTruck({ ...newTruck, status: checked ? 1 : 0 })
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
            <div className='flex justify-center'>
              <button
                type='submit'
                class='m-[0px] mt-2 h-20 w-full rounded-lg bg-[#85A547] px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                {query.id ? 'Actualizar' : 'Registrar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
