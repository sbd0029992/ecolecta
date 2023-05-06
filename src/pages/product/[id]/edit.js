import NewCollect from '../new';

const EditCollect = (props) => {
  return <NewCollect {...props} />;
};

export async function getServerSideProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/env`);
  const env = await res.json();
  return {
    props: {
      env,
    },
  };
}

export default EditCollect;
