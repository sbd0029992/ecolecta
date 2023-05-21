import { useRouter } from 'next/router';

import withSession from '../../../lib/session';
export default function ListUsers({ users }) {
  const router = useRouter();
  if (!users) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>No hay usuarios</h1>
          <div>
            <button
              className='rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600'
              onClick={() => router.push('/register')}
            >
              Crear usuario
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='background-image1 container mx-auto py-8'>
      <div className='grid grid-cols-1 gap-8 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {users.map((user) => (
          <div
            className='rounded bg-gray-800 p-4 text-white shadow'
            key={user._id}
          >
            <div>
              <h4 className='text-lg font-semibold'>
                {user.firstName} {user.lastName}
              </h4>
              <h4 className='text-sm font-medium'>{user.type}</h4>
              <a
                className='text-blue-400 hover:text-blue-600'
                href={`https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver en Google Maps
              </a>
            </div>
            <div className='mt-4 flex justify-between'>
              <button
                className='rounded bg-green-500 px-3 py-2 font-semibold text-white hover:bg-green-600'
                onClick={() => router.push(`/register/user/${user._id}/edit`)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export const getServerSideProps = withSession(async function (context) {
  const { req } = context;
  const user = req.session.get('user');

  // Verifica si el usuario no ha iniciado sesión
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

  // Busca los datos del usuario
  const userRes = await fetch(`${apiUrl}/api/auth/user`, {
    headers: {
      cookie: cookie,
    },
  });

  // Si la respuesta es OK, extrae los datos del usuario y verifica su tipo
  if (userRes.ok) {
    const userData = await userRes.json();

    // Comprueba si el usuario tiene el tipo 'admin' o 'collector'
    if (userData.type !== 'admin') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const res = await fetch(`${apiUrl}/api/users/user`);
    const users = await res.json();

    return {
      props: {
        users,
        user,
      },
    };
  } else {
    // Si la respuesta no es OK, redirige al usuario a la página de inicio
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
});
