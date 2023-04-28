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
    <div className='h-full min-h-[70vh] w-auto bg-blue-300 pb-5'>
      <h1 className='ml-4 text-white xl:ml-20'>Comentarios de Facebook</h1>
      {commentsData ? (
        <div className=' ml-20'>
          <ul>
            {commentsData.posts.data.map((post, index) => (
              <li key={index}>
                {post.comments.data.map((comment) => (
                  <li key={comment.id}>
                    {comment.from?.picture && (
                      <div className=' content mt-2 flex flex-wrap items-center justify-center'>
                        <img
                          className='  h-[8vh] w-[9vh] rounded-full '
                          src={comment.from.picture.data.url}
                          alt={`Foto de perfil de ${comment.from.name}`}
                          width={50}
                          height={50}
                        />

                        <div className='w-[270px] rounded-lg bg-white text-center lg:w-[600px]  xl:h-10 xl:w-[800px]'>
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
