import axios from 'axios';

export async function fetchComments() {
  try {
    const { data } = await axios.get(process.env.NEXT_PUBLIC_API_FACEBOOK);

    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      'Error al obtener los datos de la API de Facebook:',
      error.response.data
    );
    throw error;
  }
}
