import { useRouter } from 'next/router';
import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  const router = useRouter();
  const { asPath } = router;
  const noNav = ['/login', '/register'];
  const noFooter = ['/login', '/register'];
  return (
    <React.Fragment>
      {noNav.includes(asPath) ? null : (
        <div className='flex h-[10vh] items-center justify-between pl-6 pr-6 font-title md:pl-5 md:pr-5'>
          <Navbar />
        </div>
      )}
      <main className='h-full'>{children}</main>
      {noFooter.includes(asPath) ? null : <Footer />}
    </React.Fragment>
  );
}

export default Layout;
