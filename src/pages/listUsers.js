import { useRouter } from 'next/router';

export default function ListUsers({ users }) {
  const router = useRouter();

  if (!users) {
    return (
      <div>
        <div>
          <h1>No hay usuarios</h1>
          <div>
            <button color='blue'>Create Task</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '5px' }}>
        {users.map((user) => (
          <div
            style={{ background: 'black', color: 'white', width: '150px' }}
            key={user._id}
          >
            <div>
              <h4>{user.firstName}</h4>
              <h4>{user.type}</h4>
              <p>
                Latitud: {user.location.latitude}, Longitud:{' '}
                {user.location.longitude}
              </p>
              <a
                href={`https://www.google.com/maps?q=${user.location.latitude},${user.location.longitude}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver en Google Maps
              </a>
            </div>
            <div>
              <button
                color='blue'
                onClick={() => router.push(`/users/${user._id}`)}
              >
                View
              </button>
              <button
                color='yellow'
                onClick={() =>
                  router.push(`/register/registerUser/${user._id}/edit`)
                }
              >
                Edit
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
