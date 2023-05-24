/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
export default function Profile({ users }) {
  const router = useRouter();
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

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);
  return (
    <div class='background-plantas h-full min-h-[70vh] pb-5 pt-5 md:pt-0'>
      <div class='w-auto md:w-auto lg:w-auto xl:w-auto'>
        <section>
          <div class='flex md:pt-5'>
            <div class='ml-[20px] flex h-auto  w-[40vh] rounded-lg bg-white p-2 md:ml-auto md:mr-[25px]'>
              <div class='mt-[20px] items-center justify-center md:mt-0 md:flex md:w-auto'>
                <label class='text-black md:mr-[10px]'>
                  {userDetails?.firstName}
                  {userDetails?.lastName}
                  {userDetails?.secondLastName}
                </label>
                <div class='flex'>
                  <label class='text-black md:ml-[10px]'> PUNTOS : </label>
                  <label class='text-black md:ml-[10px]'>
                    {userDetails && userDetails.points}
                  </label>
                </div>
              </div>
              <div className='ml-2 flex w-20 items-center justify-center md:w-10'>
                {userDetails?.photos.map((image) => (
                  <div
                    key={image}
                    className='mr-4 w-auto flex-none'
                    style={{ width: '30px' }}
                  >
                    <img
                      src={image}
                      alt={userDetails.name}
                      className='h-[5vh] w-[5vh] rounded-full bg-white object-cover shadow-md '
                      width={50}
                      height={50}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <h1 class='ml-[20px] mt-[20px] w-[40vh] rounded-lg bg-white p-2 text-black'>
            TOP 5 USARIOS
          </h1>
          {users
            .sort((a, b) => b.points - a.points)
            .slice(0, 5)
            .map((user) => (
              <div
                className='rounded p-4 text-center text-[16px] text-black shadow'
                key={user._id}
              >
                <div className='ml-[30px] mt-[20px] mr-[30px] flex rounded-lg bg-white p-2 text-left md:ml-[20%] md:w-[400px] lg:ml-[30%] xl:ml-[35%] '>
                  <div className='ml-[10px] mt-[10px] '>
                    {user &&
                      user.photos &&
                      user.photos.map((image) => (
                        <div
                          key={image}
                          className='mr-4 flex-none'
                          style={{ width: '40px' }}
                        >
                          <img
                            src={image}
                            alt={user.name}
                            className='h-[5vh] w-[5vh]  rounded-md object-cover shadow-md'
                            width={50}
                            height={50}
                          />
                        </div>
                      ))}
                  </div>
                  <div class='ml-[10px] flex w-[10vh] items-center justify-center'>
                    <p className='font-bol text-[15px]'>
                      {user.nombre} {user.lastName}
                    </p>
                  </div>
                  <div className='flex w-[10vh] items-center justify-center'>
                    <label class=' font-bold'>PUNTOS</label>
                  </div>
                  <div className=' flex items-center justify-center'>
                    <label className='font-bold'>{user.points}</label>
                  </div>
                </div>
              </div>
            ))}
        </section>
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
