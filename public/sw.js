if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[n]) return;
    let t = {};
    const r = (e) => a(e, n),
      f = { module: { uri: n }, exports: t, require: r };
    s[n] = Promise.all(i.map((e) => f[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-588899ac'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/0c428ae2-be22bac0ba170513.js',
          revision: 'be22bac0ba170513',
        },
        {
          url: '/_next/static/chunks/2594-5f4a1b8645159bdf.js',
          revision: '5f4a1b8645159bdf',
        },
        {
          url: '/_next/static/chunks/4072747d-a240079b66cae33e.js',
          revision: 'a240079b66cae33e',
        },
        {
          url: '/_next/static/chunks/5675-284a25819788293b.js',
          revision: '284a25819788293b',
        },
        {
          url: '/_next/static/chunks/7718-d7bd61ecba8857ac.js',
          revision: 'd7bd61ecba8857ac',
        },
        {
          url: '/_next/static/chunks/7d0bf13e-9cc5c4baa8a9ef6e.js',
          revision: '9cc5c4baa8a9ef6e',
        },
        {
          url: '/_next/static/chunks/8100-63151ebce702c888.js',
          revision: '63151ebce702c888',
        },
        {
          url: '/_next/static/chunks/9669-ead4d4c6a8845c0e.js',
          revision: 'ead4d4c6a8845c0e',
        },
        {
          url: '/_next/static/chunks/framework-ce84985cd166733a.js',
          revision: 'ce84985cd166733a',
        },
        {
          url: '/_next/static/chunks/main-11c74ca48ccc8f40.js',
          revision: '11c74ca48ccc8f40',
        },
        {
          url: '/_next/static/chunks/pages/404-4114d52a64a74941.js',
          revision: '4114d52a64a74941',
        },
        {
          url: '/_next/static/chunks/pages/_app-c67af537a52f26f1.js',
          revision: 'c67af537a52f26f1',
        },
        {
          url: '/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js',
          revision: '02cc11fd74b4e5ff',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/%5Bid%5D-585ef2b844e03a76.js',
          revision: '585ef2b844e03a76',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/%5Bid%5D/edit-d0aa1d13fe29a634.js',
          revision: 'd0aa1d13fe29a634',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/list-659d0cbc74298123.js',
          revision: '659d0cbc74298123',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/new-752679bb11f43a0c.js',
          revision: '752679bb11f43a0c',
        },
        {
          url: '/_next/static/chunks/pages/blog-eff645cf790f2900.js',
          revision: 'eff645cf790f2900',
        },
        {
          url: '/_next/static/chunks/pages/carritoCheck-5ea2517dade887e0.js',
          revision: '5ea2517dade887e0',
        },
        {
          url: '/_next/static/chunks/pages/contact-a00122b7940f1e72.js',
          revision: 'a00122b7940f1e72',
        },
        {
          url: '/_next/static/chunks/pages/dashboard-dedf94ada27cb537.js',
          revision: 'dedf94ada27cb537',
        },
        {
          url: '/_next/static/chunks/pages/editProfile-ec73bb3bf6413a27.js',
          revision: 'ec73bb3bf6413a27',
        },
        {
          url: '/_next/static/chunks/pages/index-08376eb73d601fb9.js',
          revision: '08376eb73d601fb9',
        },
        {
          url: '/_next/static/chunks/pages/login-8b834241ee0f7fae.js',
          revision: '8b834241ee0f7fae',
        },
        {
          url: '/_next/static/chunks/pages/point_checks-85ab2bf65a232e2d.js',
          revision: '85ab2bf65a232e2d',
        },
        {
          url: '/_next/static/chunks/pages/product/%5Bid%5D-5f5663a27b5803d8.js',
          revision: '5f5663a27b5803d8',
        },
        {
          url: '/_next/static/chunks/pages/product/%5Bid%5D/edit-9e3a6b29ae9b84a8.js',
          revision: '9e3a6b29ae9b84a8',
        },
        {
          url: '/_next/static/chunks/pages/product/list-de196ca013de1e5a.js',
          revision: 'de196ca013de1e5a',
        },
        {
          url: '/_next/static/chunks/pages/product/new-ae1a6e82cd4871f9.js',
          revision: 'ae1a6e82cd4871f9',
        },
        {
          url: '/_next/static/chunks/pages/profile-64b4ff38c4be07f7.js',
          revision: '64b4ff38c4be07f7',
        },
        {
          url: '/_next/static/chunks/pages/prueba-0cc47fbdaa9a86a1.js',
          revision: '0cc47fbdaa9a86a1',
        },
        {
          url: '/_next/static/chunks/pages/recolectorCheck-4446373e4b1fc040.js',
          revision: '4446373e4b1fc040',
        },
        {
          url: '/_next/static/chunks/pages/recolectorQr-f6dc773be6fb11d5.js',
          revision: 'f6dc773be6fb11d5',
        },
        {
          url: '/_next/static/chunks/pages/recolector_page-0d14d517a29f8429.js',
          revision: '0d14d517a29f8429',
        },
        {
          url: '/_next/static/chunks/pages/recuperar-b46e6ce97a62dd89.js',
          revision: 'b46e6ce97a62dd89',
        },
        {
          url: '/_next/static/chunks/pages/register-93bee3bacf3c81c2.js',
          revision: '93bee3bacf3c81c2',
        },
        {
          url: '/_next/static/chunks/pages/register/registerUser/%5Bid%5D/edit-b6b67ed61ef6908d.js',
          revision: 'b6b67ed61ef6908d',
        },
        {
          url: '/_next/static/chunks/pages/register/registerUser/list-23975079039a1b29.js',
          revision: '23975079039a1b29',
        },
        {
          url: '/_next/static/chunks/pages/register/registerUser/new-b7efd458f94f98a9.js',
          revision: 'b7efd458f94f98a9',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/%5Bid%5D-7930342f4ef1b1b3.js',
          revision: '7930342f4ef1b1b3',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/%5Bid%5D/edit-a8b5bb6b92c0d820.js',
          revision: 'a8b5bb6b92c0d820',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/list-665263db66e81ba1.js',
          revision: '665263db66e81ba1',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/new-f93a86ff98e7b3fe.js',
          revision: 'f93a86ff98e7b3fe',
        },
        {
          url: '/_next/static/chunks/pages/registerRecolector-faac6020f722d304.js',
          revision: 'faac6020f722d304',
        },
        {
          url: '/_next/static/chunks/pages/registerTruck-33ec8bd01428a21e.js',
          revision: '33ec8bd01428a21e',
        },
        {
          url: '/_next/static/chunks/pages/tiendaProductos-2d9f4f9a29e94fbc.js',
          revision: '2d9f4f9a29e94fbc',
        },
        {
          url: '/_next/static/chunks/pages/tiendaPuntos-1f527aefc1c9ee34.js',
          revision: '1f527aefc1c9ee34',
        },
        {
          url: '/_next/static/chunks/pages/userCheck-55327a38b8b6887d.js',
          revision: '55327a38b8b6887d',
        },
        {
          url: '/_next/static/chunks/pages/user_list_verification-b31c42fbcf0f1027.js',
          revision: 'b31c42fbcf0f1027',
        },
        {
          url: '/_next/static/chunks/pages/verificationUser-b4bcbe03eebf9287.js',
          revision: 'b4bcbe03eebf9287',
        },
        {
          url: '/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js',
          revision: '837c0df77fd5009c9e46d446188ecfd0',
        },
        {
          url: '/_next/static/chunks/webpack-d5bbb0b8d9193a3e.js',
          revision: 'd5bbb0b8d9193a3e',
        },
        {
          url: '/_next/static/css/141a82a3fb79da8b.css',
          revision: '141a82a3fb79da8b',
        },
        {
          url: '/_next/static/media/check.38e0d245.png',
          revision: '3f266085cbac90b8e4c454bd7a6fc81e',
        },
        {
          url: '/_next/static/media/imagenfondo.2883c06e.jpg',
          revision: 'db7c406ede650bdff0b5d43eac587310',
        },
        {
          url: '/_next/static/rTguCfk60ELe5NgyvsdmE/_buildManifest.js',
          revision: 'a39f599271681a0b87c0165512e9b54d',
        },
        {
          url: '/_next/static/rTguCfk60ELe5NgyvsdmE/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/favicon.ico', revision: 'ad9466b5973e1742d2c698b4da68b30c' },
        {
          url: '/favicon/android-chrome-192x192.png',
          revision: 'f3338ffd752ec44d3d8716b7646e66e7',
        },
        {
          url: '/favicon/android-chrome-512x512.png',
          revision: '30df2c14fd3b1fd702ca6273345aa234',
        },
        {
          url: '/favicon/apple-touch-icon.png',
          revision: '1e4638d2944d7aaf6e81425e3ec485a5',
        },
        {
          url: '/favicon/browserconfig.xml',
          revision: 'd9502087c5a3e5391088246e51544455',
        },
        {
          url: '/favicon/favicon-16x16.png',
          revision: '178db1ccccca754e5a4f8f1faca91161',
        },
        {
          url: '/favicon/favicon-32x32.png',
          revision: 'a9a9a7d9541e209a2e33be1da1ac15fe',
        },
        {
          url: '/favicon/favicon.ico',
          revision: 'ad9466b5973e1742d2c698b4da68b30c',
        },
        {
          url: '/favicon/large-og.jpg',
          revision: '54cbf4b8f396a652ed05c560e0b6d003',
        },
        {
          url: '/favicon/mstile-150x150.png',
          revision: 'fe5e3bc715be6c8fa69882dbf3675ce1',
        },
        {
          url: '/favicon/safari-pinned-tab.svg',
          revision: '9245af9238a9c797a4044870c817271f',
        },
        {
          url: '/favicon/site.webmanifest',
          revision: '19618b2da506b5d6afda538f1d41e15c',
        },
        {
          url: '/fonts/Karla-VariableFont_wght.ttf',
          revision: '3587e87c1b4258b20afcf70a1ba5a849',
        },
        {
          url: '/fonts/PlayfairDisplay-VariableFont_wght.ttf',
          revision: '49a99e9992927568dd5c82bb2d5b95d9',
        },
        {
          url: '/fonts/inter-var-latin.woff2',
          revision: '812b3dd29751112389e93387c4f7dd0a',
        },
        {
          url: '/icon-192x192.png',
          revision: 'ccbaeeb81af863c34af1aafef0d2b27b',
        },
        {
          url: '/icon-256x256.png',
          revision: '8e25974d6a6f454aeb43bade70bac710',
        },
        {
          url: '/icon-384x384.png',
          revision: '16332c38d61666694c1584e073bfdbf4',
        },
        {
          url: '/icon-512x512.png',
          revision: 'd4b46ca0871a3fb2936bf03f9a0f84f0',
        },
        {
          url: '/images/bg-kallpalla.png',
          revision: 'fe7dbb987306868e8bb2c73b286cc3ae',
        },
        {
          url: '/images/check.png',
          revision: '3f266085cbac90b8e4c454bd7a6fc81e',
        },
        {
          url: '/images/icon-kallpalla-color.png',
          revision: '3c9fa830ece5a22fba2299e56ec2ab86',
        },
        {
          url: '/images/icon-kallpalla.png',
          revision: 'd4b46ca0871a3fb2936bf03f9a0f84f0',
        },
        {
          url: '/images/imagenfondo.jpg',
          revision: 'db7c406ede650bdff0b5d43eac587310',
        },
        {
          url: '/images/juguete.jpg',
          revision: '96a53fd485164a8660a8af088f8c210b',
        },
        {
          url: '/images/large-og.png',
          revision: 'eb36cd888797a2c8fdebfa0c7819b353',
        },
        {
          url: '/images/new-tab.png',
          revision: 'b2001de5c7ebe41cf372e676d09014f4',
        },
        { url: '/images/qr.jpg', revision: '7117ccef0fff06a24965c9e60dc35f66' },
        {
          url: '/images/user.png',
          revision: 'e9e4b7922d30b56a6abe7a18d2f8af48',
        },
        {
          url: '/images/verify.png',
          revision: 'b595cb0a4b874226317100ad1e538963',
        },
        { url: '/manifest.json', revision: 'a523e8fef9353c8a87ddc56d901838bf' },
        { url: '/robots.txt', revision: '12c1b30978435c5968e8475c0693af6d' },
        { url: '/sitemap-0.xml', revision: 'b031680a194294b589dd5a391bedcbd6' },
        { url: '/sitemap.xml', revision: 'cc3697158d8075fd190419683a1b74e5' },
        {
          url: '/svg/Vercel.svg',
          revision: 'c7d8efd08fe7e7a36a602b096e779a38',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
