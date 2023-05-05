/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { fetchComments } from '../lib/FacebookApi';

export default function Home() {
  const [commentsData, setCommentsData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchComments();
      setCommentsData(data);
    }
    fetchData();
  }, []);

  return (
    <div className='background-plantas min-h-auto h-full w-auto pb-5 '>
      <h1 className='ml-4 text-white xl:ml-20'>Comentarios de Facebook</h1>
      {commentsData ? (
        <div className=' kg:w-[90vh]  ml-6 h-auto w-[50vh] justify-center rounded-lg bg-white/50 p-2 sm:ml-20 sm:w-[60vh] md:ml-20 md:w-[100vh]  lg:ml-60  xl:ml-80 xl:w-[100vh]'>
          <ul>
            {commentsData.posts.data.map((post, index) => (
              <li key={index}>
                {post.comments.data.map((comment) => (
                  <li key={comment.id}>
                    {comment.from?.picture && (
                      <div className=' content mt-2 flex h-auto flex-wrap items-center justify-center border-black '>
                        <img
                          className='  mr-2 h-[8vh] w-[8vh] rounded-full'
                          src={comment.from.picture.data.url}
                          alt={`Foto de perfil de ${comment.from.name}`}
                          width={50}
                          height={50}
                        />

                        <div className='2xl:w[800px] h-[5vh] w-[270px] rounded-lg bg-white text-center sm:w-[40vh]  lg:w-[600px] xl:h-10 2xl:w-[800px]'>
                          Comenteario: {comment.message}
                          <label className=' invisible ml-6 text-[12px] lg:visible xl:visible'>
                            Usuario: {comment.from?.name}
                          </label>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Cargando comentarios...</p>
      )}
    </div>
  );
}
