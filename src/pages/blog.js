/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

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
    <div className='background-tierraNew h-full min-h-[70vh] py-2'>
      <h2 className='mb-2 text-white'>Comentarios de Facebook</h2>
      {commentsData ? (
        <div className='flex w-auto flex-row flex-wrap justify-center gap-3 sm:flex-row'>
          {commentsData.posts.data.map((post, index) => (
            <React.Fragment key={index}>
              {post.comments.data.map((comment) => (
                <div key={comment.id} className=' '>
                  {comment.from?.picture && (
                    <figure class='rounded-xl bg-slate-100 p-8 dark:bg-slate-800 md:flex md:p-0'>
                      <img
                        class='mx-auto h-24 w-24 rounded-full md:h-auto md:w-48 md:rounded-none'
                        src={comment.from.picture.data.url}
                        alt={`Foto de perfil de ${comment.from.name}`}
                        width='384'
                        height='512'
                      />
                      <div class='space-y-4 pt-6 text-center md:p-8 md:text-left'>
                        <blockquote>
                          <p class='text-lg font-medium'>"{comment.message}"</p>
                        </blockquote>
                        <figcaption class='font-medium'>
                          <div class='text-sky-500 dark:text-sky-400'>
                            {comment.from?.name}
                          </div>
                        </figcaption>
                      </div>
                    </figure>
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <p>Cargando comentarios...</p>
      )}
    </div>
  );
}
