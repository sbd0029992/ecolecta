import { useRouter } from 'next/router';

export default function ListUsers({ users }) {
  const router = useRouter();

  if (!users) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>No hay usuarios</h1>
          <div>
            <button
              className='rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
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
    <div className='container mx-auto py-8'>
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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
                className='rounded bg-yellow-500 px-3 py-2 font-semibold text-white hover:bg-yellow-600'
                onClick={() =>
                  router.push(`/register/registerUser/${user._id}/edit`)
                }
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

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/users');
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};
