/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function Profile({ users }) {
  const [userDetails, setUserDetails] = useState(null);
  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    const getUserContext = async () => {
      const { data } = await axios.get('/api/auth/user');
      setdataUser(data);
    };
    getUserContext();
  }, []);

  const getUser = async () => {
    try {
      if (!dataUser) {
        console.log('sin susaurio');
        return;
      } else {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${dataUser.idUser}`
        );
        const user = data.user;
        setUserDetails(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fullNames = () => {
    if (userDetails) {
      return `${userDetails.firstName} ${userDetails.lastName}`;
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);
  return (
    <div className='background-plantas flex flex-col '>
      <div className='flex w-full items-end justify-end p-5'>
        <div className='flex w-3/4 flex-row   items-center justify-between rounded-lg bg-white p-4 shadow-md md:w-4/12'>
          <div className='text-lg  text-black'>{fullNames()}</div>
          <div className='text-lg  text-black'>
            <strong>Puntos: </strong> {userDetails && userDetails.points}
          </div>
        </div>
      </div>
      <div className=' flex flex-col items-center justify-center gap-5'>
        <div className='flex w-full  flex-col items-center justify-center gap-5 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <h1 className='rounded-md bg-green-500 p-3 text-2xl font-bold text-white'>
            TOP 5 USUARIOS
          </h1>
          <div className='flex w-full flex-col items-center justify-center gap-5 p-5'>
            {users
              .sort((a, b) => b.points - a.points)
              .slice(0, 5)
              .map((user) => (
                <div
                  className='flex w-full flex-row items-center justify-between rounded-xl bg-white p-3 shadow-md'
                  key={user._id}
                >
                  <div className='text-lg  text-black'>
                    <strong>Usuario:</strong> {user.firstName} {user.lastName}
                  </div>
                  <div className='text-lg  text-black'>
                    <strong>Puntos: </strong> {user.points}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/users/user`);
  const users = await res.json();
  return {
    props: {
      users,
    },
  };
};
