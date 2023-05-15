/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ListPointsend({ points }) {
  console.log('🚀 ~ file: listSend.js:5 ~ ListPointsend ~ points:', points);
  const router = useRouter();
  if (points.length === 0) {
    return (
      <div className='flex h-full min-h-[70vh] flex-col items-center justify-center'>
        <div>
          <h1 className='mb-4 text-2xl font-bold'>
            Ningun comprobante de puntos para verificar
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className='background-plantas container mx-auto py-8'>
      <div className='flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row'>
        {points.map((point) => (
          <div
            className='w-[300px] rounded-lg bg-gray-800 p-4 text-white shadow'
            key={point._id}
          >
            <div>
              <h4 className='text-lg font-semibold'>
                {point.user.firstName} {point.user.lastName}{' '}
                {point.user?.secondLastName}
              </h4>
              <h4 className='text-lg font-semibold'>{point.point.name}</h4>
              <h4 className='text-sm font-medium'>Comprobante enviado</h4>
              <img className='w-full' src={point.images} alt={point.name} />
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                className='rounded bg-green-500 px-3 py-2 font-semibold text-white hover:bg-green-600'
                onClick={() => router.push(`/point/${point._id}/accept`)}
              >
                VERIFICAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cart/points/verify`
  );
  const points = data;
  return {
    props: {
      points,
    },
  };
};
