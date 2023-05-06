import '/src/styles/globals.css';
import '/src/styles/colors.css';

import Layout from '../components/Layout';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
