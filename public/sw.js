if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
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
  self.define = (c, i) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let n = {};
    const r = (e) => a(e, t),
      d = { module: { uri: t }, exports: n, require: r };
    s[t] = Promise.all(c.map((e) => d[e] || r(e))).then((e) => (i(...e), n));
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
          url: '/_next/static/GXIBaM19Nac34IUa4mwja/_buildManifest.js',
          revision: 'da1e73ac758f071c6cd220ed6da430e4',
        },
        {
          url: '/_next/static/GXIBaM19Nac34IUa4mwja/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1-0ec2e503de57f4a3.js',
          revision: '0ec2e503de57f4a3',
        },
        {
          url: '/_next/static/chunks/3253-7ab84c28f98b5dd8.js',
          revision: '7ab84c28f98b5dd8',
        },
        {
          url: '/_next/static/chunks/3388-4db2ecdd9452831c.js',
          revision: '4db2ecdd9452831c',
        },
        {
          url: '/_next/static/chunks/4072747d-3eebae392f978be3.js',
          revision: '3eebae392f978be3',
        },
        {
          url: '/_next/static/chunks/4223-e4f2945eee445cd3.js',
          revision: 'e4f2945eee445cd3',
        },
        {
          url: '/_next/static/chunks/4763-a89e3edbe433c9bb.js',
          revision: 'a89e3edbe433c9bb',
        },
        {
          url: '/_next/static/chunks/6430-09741577a8a9530e.js',
          revision: '09741577a8a9530e',
        },
        {
          url: '/_next/static/chunks/6472-60889410b52e0a3d.js',
          revision: '60889410b52e0a3d',
        },
        {
          url: '/_next/static/chunks/7201-107fc737e4d75ed1.js',
          revision: '107fc737e4d75ed1',
        },
        {
          url: '/_next/static/chunks/7536-7fc5471e2ac2b8f6.js',
          revision: '7fc5471e2ac2b8f6',
        },
        {
          url: '/_next/static/chunks/7713-ae9be8fa511e5a46.js',
          revision: 'ae9be8fa511e5a46',
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
          url: '/_next/static/chunks/pages/_app-2f5e2a77a1224c10.js',
          revision: '2f5e2a77a1224c10',
        },
        {
          url: '/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js',
          revision: '02cc11fd74b4e5ff',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/%5Bid%5D-ccbe0a3159fe7b94.js',
          revision: 'ccbe0a3159fe7b94',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/%5Bid%5D/edit-4c266edb3352f0e8.js',
          revision: '4c266edb3352f0e8',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/list-77e1ba6ca9503937.js',
          revision: '77e1ba6ca9503937',
        },
        {
          url: '/_next/static/chunks/pages/affiliate/new-4f95bb9c5fa714ef.js',
          revision: '4f95bb9c5fa714ef',
        },
        {
          url: '/_next/static/chunks/pages/blog-401cfa3f7ea495ba.js',
          revision: '401cfa3f7ea495ba',
        },
        {
          url: '/_next/static/chunks/pages/carritoCheck-dd9bf2094faa7ff8.js',
          revision: 'dd9bf2094faa7ff8',
        },
        {
          url: '/_next/static/chunks/pages/collect/collector/%5Bid%5D-f8e1cbdbdf588822.js',
          revision: 'f8e1cbdbdf588822',
        },
        {
          url: '/_next/static/chunks/pages/collect/collector/%5Bid%5D/edit-06a17278aed6c732.js',
          revision: '06a17278aed6c732',
        },
        {
          url: '/_next/static/chunks/pages/collect/collector/list-26d04c79675d1a76.js',
          revision: '26d04c79675d1a76',
        },
        {
          url: '/_next/static/chunks/pages/collect/collector/listCollector-c5dac0feb2ae563a.js',
          revision: 'c5dac0feb2ae563a',
        },
        {
          url: '/_next/static/chunks/pages/collect/collector/new-8945cb31ca0113b5.js',
          revision: '8945cb31ca0113b5',
        },
        {
          url: '/_next/static/chunks/pages/collect/user/%5Bid%5D-dc830d7439dbd702.js',
          revision: 'dc830d7439dbd702',
        },
        {
          url: '/_next/static/chunks/pages/collect/user/%5Bid%5D/edit-a596a5f54c1458a1.js',
          revision: 'a596a5f54c1458a1',
        },
        {
          url: '/_next/static/chunks/pages/collect/user/list-ccc4040c3e8b9097.js',
          revision: 'ccc4040c3e8b9097',
        },
        {
          url: '/_next/static/chunks/pages/collect/user/new-f64ea56c117f7002.js',
          revision: 'f64ea56c117f7002',
        },
        {
          url: '/_next/static/chunks/pages/contact-423ed1e1a892bf7c.js',
          revision: '423ed1e1a892bf7c',
        },
        {
          url: '/_next/static/chunks/pages/dashboard-7ae4e590d9d2bc47.js',
          revision: '7ae4e590d9d2bc47',
        },
        {
          url: '/_next/static/chunks/pages/editProfile-3cd742884c93a868.js',
          revision: '3cd742884c93a868',
        },
        {
          url: '/_next/static/chunks/pages/index-b82e8fcd172974ec.js',
          revision: 'b82e8fcd172974ec',
        },
        {
          url: '/_next/static/chunks/pages/login-5e3b492a79f87a76.js',
          revision: '5e3b492a79f87a76',
        },
        {
          url: '/_next/static/chunks/pages/point/%5Bid%5D-4df6f9fcddcc9b2c.js',
          revision: '4df6f9fcddcc9b2c',
        },
        {
          url: '/_next/static/chunks/pages/point/%5Bid%5D/accept-934fd9800907c02b.js',
          revision: '934fd9800907c02b',
        },
        {
          url: '/_next/static/chunks/pages/point/%5Bid%5D/edit-8efbff75c6d39dd2.js',
          revision: '8efbff75c6d39dd2',
        },
        {
          url: '/_next/static/chunks/pages/point/%5Bid%5D/verify-1381810c92f12f76.js',
          revision: '1381810c92f12f76',
        },
        {
          url: '/_next/static/chunks/pages/point/carrito-0225be36dce9a1a1.js',
          revision: '0225be36dce9a1a1',
        },
        {
          url: '/_next/static/chunks/pages/point/list-6e8f97aea26e5c91.js',
          revision: '6e8f97aea26e5c91',
        },
        {
          url: '/_next/static/chunks/pages/point/listSend-4d71be5ca2e1ce0b.js',
          revision: '4d71be5ca2e1ce0b',
        },
        {
          url: '/_next/static/chunks/pages/point/new-e388fa52ff11f3df.js',
          revision: 'e388fa52ff11f3df',
        },
        {
          url: '/_next/static/chunks/pages/point/tienda-2047e6990351d966.js',
          revision: '2047e6990351d966',
        },
        {
          url: '/_next/static/chunks/pages/point_checks-8ac64363c84add54.js',
          revision: '8ac64363c84add54',
        },
        {
          url: '/_next/static/chunks/pages/product/%5Bid%5D-ba5907224c86b4b5.js',
          revision: 'ba5907224c86b4b5',
        },
        {
          url: '/_next/static/chunks/pages/product/%5Bid%5D/edit-a979ed07d68c0c41.js',
          revision: 'a979ed07d68c0c41',
        },
        {
          url: '/_next/static/chunks/pages/product/carrito-c8255c23f9932a6a.js',
          revision: 'c8255c23f9932a6a',
        },
        {
          url: '/_next/static/chunks/pages/product/list-4576ee4ebafc0d46.js',
          revision: '4576ee4ebafc0d46',
        },
        {
          url: '/_next/static/chunks/pages/product/listBuy-a16cc67f30130564.js',
          revision: 'a16cc67f30130564',
        },
        {
          url: '/_next/static/chunks/pages/product/new-131c2d4bc066fe5a.js',
          revision: '131c2d4bc066fe5a',
        },
        {
          url: '/_next/static/chunks/pages/product/tienda-dc4629d5644ce927.js',
          revision: 'dc4629d5644ce927',
        },
        {
          url: '/_next/static/chunks/pages/prueba-b492f20ee7cb52b1.js',
          revision: 'b492f20ee7cb52b1',
        },
        {
          url: '/_next/static/chunks/pages/recolectorCheck-217b8ddca0b8e50b.js',
          revision: '217b8ddca0b8e50b',
        },
        {
          url: '/_next/static/chunks/pages/recolectorPage-124a87068fe83d6f.js',
          revision: '124a87068fe83d6f',
        },
        {
          url: '/_next/static/chunks/pages/recolectorQr-6a36ed6b6786557f.js',
          revision: '6a36ed6b6786557f',
        },
        {
          url: '/_next/static/chunks/pages/recuperar-b4617dc7eaee899a.js',
          revision: 'b4617dc7eaee899a',
        },
        {
          url: '/_next/static/chunks/pages/register-9ad7d76b9c29e71f.js',
          revision: '9ad7d76b9c29e71f',
        },
        {
          url: '/_next/static/chunks/pages/register/collector/%5Bid%5D-b22f5d38c795aaf9.js',
          revision: 'b22f5d38c795aaf9',
        },
        {
          url: '/_next/static/chunks/pages/register/collector/%5Bid%5D/edit-ca31bcd0e8937952.js',
          revision: 'ca31bcd0e8937952',
        },
        {
          url: '/_next/static/chunks/pages/register/collector/list-8c2ab4f7be996202.js',
          revision: '8c2ab4f7be996202',
        },
        {
          url: '/_next/static/chunks/pages/register/collector/new-8ef80b74a8ca6a59.js',
          revision: '8ef80b74a8ca6a59',
        },
        {
          url: '/_next/static/chunks/pages/register/collector/profile-98f3cf82b8a80da3.js',
          revision: '98f3cf82b8a80da3',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/%5Bid%5D-d5566d2afbc86fba.js',
          revision: 'd5566d2afbc86fba',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/%5Bid%5D/edit-e2003210bd7bbaaf.js',
          revision: 'e2003210bd7bbaaf',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/list-ae60f56e5dacb917.js',
          revision: 'ae60f56e5dacb917',
        },
        {
          url: '/_next/static/chunks/pages/register/truck/new-5befb7f32311c1f1.js',
          revision: '5befb7f32311c1f1',
        },
        {
          url: '/_next/static/chunks/pages/register/user/%5Bid%5D/confirm-b778531ed67323ce.js',
          revision: 'b778531ed67323ce',
        },
        {
          url: '/_next/static/chunks/pages/register/user/%5Bid%5D/edit-5a4328bdfd12a0bb.js',
          revision: '5a4328bdfd12a0bb',
        },
        {
          url: '/_next/static/chunks/pages/register/user/%5Bid%5D/password-00fa18b7dcb6dc84.js',
          revision: '00fa18b7dcb6dc84',
        },
        {
          url: '/_next/static/chunks/pages/register/user/%5Bid%5D/verify-c5fd3306510e7d24.js',
          revision: 'c5fd3306510e7d24',
        },
        {
          url: '/_next/static/chunks/pages/register/user/list-a7b6526139fe4efa.js',
          revision: 'a7b6526139fe4efa',
        },
        {
          url: '/_next/static/chunks/pages/register/user/new-61abb573adb02ed3.js',
          revision: '61abb573adb02ed3',
        },
        {
          url: '/_next/static/chunks/pages/register/user/photoList-f8c7f4992ed0fd9b.js',
          revision: 'f8c7f4992ed0fd9b',
        },
        {
          url: '/_next/static/chunks/pages/register/user/profile-911e9330dcb641f6.js',
          revision: '911e9330dcb641f6',
        },
        {
          url: '/_next/static/chunks/pages/registerRecolector-fa8f3d8372f90852.js',
          revision: 'fa8f3d8372f90852',
        },
        {
          url: '/_next/static/chunks/pages/registerTruck-33ec8bd01428a21e.js',
          revision: '33ec8bd01428a21e',
        },
        {
          url: '/_next/static/chunks/pages/store/point/%5Bid%5D-110a8df051c929b1.js',
          revision: '110a8df051c929b1',
        },
        {
          url: '/_next/static/chunks/pages/store/point/%5Bid%5D/edit-43d19255a7aa6102.js',
          revision: '43d19255a7aa6102',
        },
        {
          url: '/_next/static/chunks/pages/store/point/list-7a7d41ccd37c1eaf.js',
          revision: '7a7d41ccd37c1eaf',
        },
        {
          url: '/_next/static/chunks/pages/store/point/new-c351b5e8f57859af.js',
          revision: 'c351b5e8f57859af',
        },
        {
          url: '/_next/static/chunks/pages/store/product/%5Bid%5D-10c89c418651cf50.js',
          revision: '10c89c418651cf50',
        },
        {
          url: '/_next/static/chunks/pages/store/product/%5Bid%5D/edit-deb09177b5f6505b.js',
          revision: 'deb09177b5f6505b',
        },
        {
          url: '/_next/static/chunks/pages/store/product/list-a9f8010da10985a4.js',
          revision: 'a9f8010da10985a4',
        },
        {
          url: '/_next/static/chunks/pages/store/product/new-e5dc23bfa88d8d7a.js',
          revision: 'e5dc23bfa88d8d7a',
        },
        {
          url: '/_next/static/chunks/pages/tiendaProductos-14aa639bf7b6298a.js',
          revision: '14aa639bf7b6298a',
        },
        {
          url: '/_next/static/chunks/pages/tiendaPuntos-c529913c7b941587.js',
          revision: 'c529913c7b941587',
        },
        {
          url: '/_next/static/chunks/pages/user_list_verification-a75bdbf77171d515.js',
          revision: 'a75bdbf77171d515',
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
          url: '/_next/static/css/a8cb8657dc9f831a.css',
          revision: 'a8cb8657dc9f831a',
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
          url: '/_next/static/media/logo.0b6c1feb.png',
          revision: 'c96101e2ec3906decddb37ab74c14245',
        },
        { url: '/_next/static/media/menu.f0b15108.jpg', revision: 'f0b15108' },
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
          url: '/fonts/Montserrat-VariableFont_wght.ttf',
          revision: '0862772643ff65b7a76ef8cde6c26eae',
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
          url: '/images/fond-1.jpeg',
          revision: 'a3ae8b31254ebf75638b4d683a94e709',
        },
        {
          url: '/images/fond-2.jpeg',
          revision: '49e52361c1086a72283818b5f132bdbf',
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
          url: '/images/logo.png',
          revision: 'c96101e2ec3906decddb37ab74c14245',
        },
        {
          url: '/images/menu.jpg',
          revision: 'efb09f075d5b7c0b94fafa8e22a17a32',
        },
        {
          url: '/images/new-tab.png',
          revision: 'b2001de5c7ebe41cf372e676d09014f4',
        },
        {
          url: '/images/no-data.png',
          revision: '38aed7e93bcf14738901ac12abaa48b7',
        },
        {
          url: '/images/plantas.jpeg',
          revision: 'f2431146be3f1dfaeba58fdb0772e7c7',
        },
        { url: '/images/qr.jpg', revision: '7117ccef0fff06a24965c9e60dc35f66' },
        {
          url: '/images/tierra.jpeg',
          revision: '9bc7beda864a9f69feb78fce17587e7b',
        },
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
        { url: '/sitemap-0.xml', revision: 'd2bfae9c285e8b86a077f4dd41cc4710' },
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
              state: c,
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
