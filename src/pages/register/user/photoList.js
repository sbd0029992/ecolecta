/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';

export default function PhotoListUsers({ users }) {
  console.log('🚀 ~ file: photoList.js:4 ~ PhotoListUsers ~ users:', users);
  const router = useRouter();
  if (!users) {
    return (
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>
            Sin comprovantes de usuarios
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-full min-h-[70vh] w-full py-8'>
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
              <h3 className='text-sm font-medium'>Qr Recivo</h3>
              <img src={user.photos} alt={user.photos} />
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                className='rounded bg-green-500 px-3 py-2 font-semibold text-white hover:bg-green-600'
                onClick={() =>
                  router.push(`/register/user/${user._id}/confirm`)
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/users/userPhoto`);
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};
