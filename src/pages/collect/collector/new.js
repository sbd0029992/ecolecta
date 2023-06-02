import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import withSession from '../../../lib/session';

import { AuthContext } from '/src/context/authContext';

export default function NewCollect() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { userData } = useContext(AuthContext);
  const { query, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [newCollect, setNewCollect] = useState({
    collector: null,
    user: query.id ? null : [],
    status: 1,
    points: '',
    buckets: 1,
    description: '',
    time: '',
    fault: 0,
    images: query.id ? [''] : [],
  });
  const getCollect = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/collects/${query.id}`);
      const apiCollect = data;
      //convert date to input type='datetime-local' format
      const date = new Date(apiCollect.time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const time = `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }T${hour < 10 ? `0${hour}` : hour}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;
      apiCollect.time = time;
      setNewCollect((prevCollect) => ({
        collector: prevCollect.collector
          ? prevCollect.collector
          : apiCollect.collector,
        user: apiCollect.user[0],
        status: apiCollect.status,
        points: apiCollect.points,
        buckets: apiCollect.buckets,
        description: apiCollect.description,
        time: apiCollect.time,
        fault: apiCollect.fault,
        images: apiCollect.images,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData && userData.idUser) {
      setNewCollect((prevCollect) => ({
        ...prevCollect,
        collector: userData.idUser,
      }));
    }
    if (query.id) {
      getCollect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id, userData]);

  const handleChange = (e) => {
    setNewCollect((prevCollect) => ({
      ...prevCollect,
      [e.target.id]: e.target.value,
    }));
  };

  const updateCollect = async (collect) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/collects/collector/${query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(collect),
        }
      );
      if (!response.ok) {
        toast.error('¡Error al actualizar la recolecta!');
      } else {
        if (collect.status === 2) {
          toast.success('Recolecta Actualizada con éxito');
        }
        if (collect.status === 3) {
          toast.success('Recolecta finalizada con éxito');
        }

        push('/collect/collector/listCollector');
      }
    } catch (error) {
      // alert(error);
      toast.error('¡Error al actualizar la recolecta!');
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (query.id) {
        await updateCollect(newCollect);
      }
    } catch {
      setLoading(false);
    }
  };
  const today = new Date().toISOString().slice(0, 16);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 20);
  const max = maxDate.toISOString().slice(0, 16);

  return (
    <div className='background-tierra flex h-full min-h-[70vh] justify-center py-5 scrollbar-hide'>
      <form onSubmit={handleSubmit} className='self-center'>
        <div className='flex flex-col items-center justify-center gap-5 md:flex-row'>
          {/* Client card */}
          <div className='flex min-w-[340px] flex-col justify-center gap-2 rounded-lg bg-[#10523e] p-4 text-white'>
            <div>
              <h3 id='user'>
                {newCollect.user
                  ? `${newCollect?.user.firstName} ${newCollect?.user.lastName} ${newCollect?.user.secondLastName}  `
                  : null}
              </h3>
              {newCollect.user ? (
                <a
                  href={`https://api.whatsapp.com/send?phone=591${newCollect?.user.phone}`}
                  target='_blank'
                  rel='noreferrer'
                  className='text-white hover:text-green-500'
                >
                  Presione para hablar con el usuario
                </a>
              ) : null}
            </div>
            {/* {query.id &&
            newCollect.user &&
            newCollect.user.length > 0 &&
            newCollect.user[0].location &&
            isDataLoaded ? (
              <div className='flex flex-row justify-between'>
                
              </div>
            ) : null} */}

            <div className='flex flex-row justify-between'>
              <h4 className=' rounded-lg text-white'>Cantidad de baldes :</h4>
              <input
                id='buckets'
                type='number'
                onChange={handleChange}
                value={newCollect.buckets}
                disabled
                min={1}
                className=' w-16 rounded-lg bg-white text-center text-lg text-black'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <h4 className=' text-white'>Descripción:</h4>
              <div className='text-center'>
                <textarea
                  id='description'
                  onChange={handleChange}
                  value={newCollect.description}
                  disabled
                  className=' h-20 w-5/6 rounded-lg border border-black text-left text-black'
                  placeholder='Algo que quieras agregar?'
                ></textarea>
              </div>
            </div>
            <div className='flex flex-row justify-evenly  '>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewCollect((prevCollect) => ({
                    ...prevCollect,
                    fault: prevCollect.fault - 10,
                  }));
                }}
                className='w-fit rounded-full bg-red-500 py-2 px-4 font-bold text-black '
              >
                Penalizar
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setNewCollect((prevCollect) => ({
                    ...prevCollect,
                    fault: prevCollect.fault + 10,
                  }));
                }}
                className='w-fit rounded-full bg-[#33C16F] py-2 px-4 font-bold text-black '
              >
                Quitar Penalizacion
              </button>
            </div>
            <p className='text-center text-white'>
              {'Penalizacion de: ' + newCollect.fault}
            </p>
          </div>
          {/* Recolector card */}
          <div className='flex w-[90vw] flex-col justify-center gap-5 rounded-xl bg-white p-4 font-secondary sm:h-fit sm:w-[300px] '>
            <div className='flex flex-row justify-between gap-1'>
              <p className='flex h-14 w-32 items-center justify-center rounded-xl bg-blue-400 text-2xl font-semibold text-black '>
                {newCollect.status == 1
                  ? 'Mandado'
                  : newCollect.status == 2
                  ? 'En camino'
                  : 'Finalizado'}
              </p>
              {newCollect.user && newCollect.user.location ? (
                <div className='flex flex-row justify-between'>
                  <a
                    className='flex h-14 w-32 items-center justify-center rounded-xl bg-primary text-center text-2xl font-semibold text-white '
                    href={`https://www.google.com/maps?q=${newCollect.user?.location.latitude},${newCollect.user?.location.longitude}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Ubicacion
                  </a>
                </div>
              ) : null}
            </div>
            <div className='flex flex-col gap-4'>
              <div className='items-start'>
                <h1 className='text-center font-secondary text-black sm:text-2xl sm:font-normal '>
                  Fecha y Hora estimada de llegada
                </h1>
              </div>
              <div className='flex justify-center'>
                <input
                  className='h-14 max-w-fit rounded-lg bg-green-200 text-center text-xl'
                  type='datetime-local'
                  id='time'
                  min={today}
                  max={max}
                  value={
                    newCollect.time === '1969-12-31T20:00'
                      ? today
                      : newCollect.time
                  }
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              {newCollect.status === 2 ? (
                <button
                  className='h-14 w-full rounded-xl bg-green-500 text-3xl font-bold text-black'
                  type='submit'
                >
                  Actualizar
                </button>
              ) : null}
              <button
                type='submit'
                disabled={loading}
                onClick={() => {
                  setNewCollect((prevCollect) => ({
                    ...prevCollect,
                    status: prevCollect.status === 2 ? 3 : 2,
                  }));
                }}
                className={`h-14 w-full rounded-xl text-3xl font-bold text-black ${
                  newCollect.status === 2 ? 'bg-red-500' : 'bg-green-500'
                }`}
              >
                {loading
                  ? 'Cargando...'
                  : newCollect.status === 2
                  ? 'FINALIZADO'
                  : 'VAMOS'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export const getServerSideProps = withSession(async function (context) {
  const { req } = context;
  const user = req.session.get('user');

  // check if user is not logged in
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookie = context.req.headers.cookie;
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  if (userRes.ok) {
    const userData = await userRes.json();
    if (userData.type !== 'admin' && userData.type !== 'collector') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const res = await fetch(`${apiUrl}/api/collects`);
    const affiliates = await res.json();

    return {
      props: {
        user,
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
});
