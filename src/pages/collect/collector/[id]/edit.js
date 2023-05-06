import NewProduct from '../new';

const EditProduct = (props) => {
  return <NewProduct {...props} />;
};

export async function getServerSideProps(context) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/env`);
  const env = await res.json();
  return {
    props: {
      env,
    },
  };
}

export default EditProduct;
