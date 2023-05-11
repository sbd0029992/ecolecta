import NewAffiliate from '../new';

const EditAffiliate = (props) => {
  return <NewAffiliate {...props} />;
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

export default EditAffiliate;
