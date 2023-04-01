import React from 'react';

import ListComment from '../components/listComment';

function blog() {
  const values = [
    {
      id: '1',
      photo: '/images/user.png',
      comment: 'La mejor empresa para la ayuda al medio ambiente',
      user: 'Usario: Juan Perez',
    },
    {
      id: '2',
      photo: '/images/user.png',
      comment: 'La mejor empresa para la ayuda al medio ambiente',
      user: 'Usario: Juan Perez',
    },
    {
      id: '3',
      photo: '/images/user.png',
      comment: 'La mejor empresa para la ayuda al medio ambiente',
      user: 'Usario: Juan Perez',
    },
  ];

  return (
    <div className='h-full min-h-[70vh] w-auto bg-blue-300 pb-5'>
      <div className='content items-center justify-center p-2 text-center'>
        <button className='mt-10 h-10 w-[200px] rounded-lg bg-prymary font-primary text-white no-underline xl:w-[200px] '>
          Publicar
        </button>
      </div>
      <br />
      <div>
        <h2 className='ml-4 text-white xl:ml-20'>Noticias y Comentarios</h2>
      </div>
      <br />
      <div className='content flex flex-col items-center text-center lg:ml-[160px] lg:w-[700px] xl:ml-[300px] xl:w-[800px]'>
        {values.map((value) => (
          <ListComment data={value} key={value.id} />
        ))}
      </div>
    </div>
  );
}
export default blog;
