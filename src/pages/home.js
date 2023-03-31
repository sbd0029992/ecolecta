import Image from 'next/image';
import React from 'react';

import imaimport from '../../public/images/imagenfondo.jpg';

function Home() {
  return (
    <div class='h-10000 w-[500px] bg-[#4D7C0F] md:w-[1000px] lg:w-auto xl:w-auto'>
      <div class='md:invisible'>
        <div class='container flex flex-wrap p-1 '>
          <h1 class='mr-60 ml-6 mt-6 text-white md:mr-[600px]'>Home</h1>
          <button class='md:text-2xl'> ||| </button>
        </div>
      </div>
      <div class='md:flex md:h-[100vh] lg:ml-[70px] lg:mr-[70px] xl:ml-[100px] xl:mr-[100px]'>
        <div class='md:ml[1000px]'>
          <div class="m-10 h-60 w-80 bg-black bg-[url('../../public/images/imagenfondo.jpg')] bg-cover md:h-[500px] md:w-[500px]">
            <h1> text</h1>
          </div>
          {/* <Image class='m-10 bg-black h-60 w-80 md:w-[500px] md:h-[500px]' src={imaimport} alt='imagen de un check' /> */}
        </div>
        <div class=''>
          <div class='collapse  h-[0px] w-[0px] text-xs text-white md:visible md:m-6 md:mt-[200px] md:h-auto md:w-auto md:text-2xl '>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Consequuntur, fugit. Possimus excepturi officiis labore sapiente
            totam harum
          </div>
          <button class='ml-6 rounded-lg bg-[#A3E635] p-1 pl-2 pr-2 text-white md:h-[60px] md:w-[150px] md:text-2xl'>
            Informate
          </button>
          <br></br>
          <div class='m-6 text-white sm:visible md:invisible md:m-0 md:text-2xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Consequuntur, fugit. Possimus excepturi officiis labore sapiente
            totam harum
          </div>
        </div>
      </div>

      <Image
        class='m-10 h-60 w-80 bg-black md:invisible md:m-0 md:h-[0px] md:w-[0px]'
        src={imaimport}
        alt='imagen de un check'
      />
      <div class='md:flex md:h-[100vh] md:items-center lg:ml-[70px] lg:mr-[70px] lg:mt-[-10px] xl:ml-[100px] xl:mr-[100px]'>
        <div>
          <h1 class='m-6 text-white md:mt-0 '>Afiliados</h1>
          <div class='m-6 text-white md:text-2xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
            Consequuntur, fugit. Possimus excepturi officiis labore sapiente
            totam harum
          </div>
        </div>
        <div class='] mr-5  ml-5 flex h-[200px]  w-auto overflow-auto overflow-x-scroll bg-black md:mt-[50px]'>
          <Image
            class='m-10 mt-5 mb-5 h-20 w-20 rounded-full bg-black md:mt-[30px]'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='m-10 mt-5 mb-5 h-20 w-20 rounded-full bg-black md:mt-[30px]'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='m-10 mt-5 mb-5 h-20 w-20 rounded-full bg-black md:mt-[30px]'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='m-10 mt-5 mb-5 h-20 w-20 rounded-full bg-black md:mt-[30px]'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='m-10 mt-5 mb-5 h-20 w-20 rounded-full bg-black md:mt-[30px]'
            src={imaimport}
            alt='imagen de un check'
          />
        </div>
      </div>
      <div class=' md:h-[100vh] xl:ml-[100px] xl:mr-[100px]'>
        <h1 class='m-6 text-white md:w-[700px] lg:ml-[70px] lg:mt-[100px]'>
          Inicia y Gana
        </h1>
        <div class='mr-5 ml-5 flex flex-wrap'>
          <div class='ml-[50px] md:ml-[100px] xl:ml-[30px]'>
            <Image
              class='h-40 w-40 bg-black md:h-60 md:w-80 xl:w-[250px]'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Por Cumpleaños</label>
          </div>
          <div class='ml-[50px] md:ml-[100px] xl:ml-[30px]'>
            <Image
              class='h-40 w-40 bg-black md:h-60 md:w-80 xl:w-[250px]'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Por Seguir</label>
          </div>
          <div class='ml-[50px] md:ml-[100px] xl:ml-[30px]'>
            <Image
              class='h-40 w-40 bg-black md:h-60 md:w-80 xl:w-[250px]'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Por Comentar</label>
          </div>
          <div class='ml-[50px] md:ml-[100px] xl:ml-[30px]'>
            <Image
              class='h-40 w-40 bg-black md:h-60 md:w-80 xl:w-[250px]'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Por Compartir</label>
          </div>
        </div>
      </div>
      <div class='md:h-[100vh] lg:ml-[70px] lg:mt-[100px] xl:ml-[100px] xl:mr-[100px]'>
        <h1 class='m-6 text-white'>Cambio de puntos</h1>
        <h2 class='m-6 text-white xl:ml-[100px]'>Electronicos</h2>
        <div class='container flex flex-wrap p-1 xl:ml-[100px]'>
          <div class='ml-5'>
            <Image
              class='h-[250px] w-[200px] bg-black'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Producto 1</label>
            <label class='text-white'> Puntos 200</label>
          </div>
          <div class='ml-5'>
            <Image
              class='h-[250px] w-[200px] bg-black'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Producto 2</label>
            <label class='text-white'> Puntos 400</label>
          </div>
        </div>
        <h2 class='m-6 text-white xl:ml-[100px]'>Hogar</h2>
        <div class='container flex flex-wrap p-1 xl:ml-[100px]'>
          <div class='ml-5'>
            <Image
              class='h-[250px] w-[200px] bg-black'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Producto 1</label>
            <label class='text-white'> Puntos 200</label>
          </div>
          <div class='ml-5'>
            <Image
              class='h-[250px] w-[200px] bg-black'
              src={imaimport}
              alt='imagen de un check'
            />
            <label class='text-white'> Producto 2</label>
            <label class='text-white'> Puntos 400</label>
          </div>
        </div>
      </div>
      <div class=''>
        <h1 class='m-6 text-white lg:ml-[70px] lg:mt-[100px] xl:ml-[500px]'>
          Mas Sobre Nosotros{' '}
        </h1>
        <Image
          class='m-8 h-60 w-80 bg-black md:h-[700px] md:w-[700px] lg:ml-[150px] xl:ml-[350px]'
          src={imaimport}
          alt='imagen de un check'
        />
        <Image
          class='m-8 h-60 w-80 bg-black md:h-[700px] md:w-[700px] lg:ml-[150px] xl:ml-[350px]'
          src={imaimport}
          alt='imagen de un check'
        />
      </div>
      <div class='md:h-[100vh]'>
        <h1 class='m-6 text-white md:ml-[100px] lg:mt-[100px] xl:ml-[300px]'>
          Club{' '}
        </h1>
        <div class='flex md:ml-[200px] lg:ml-[290px] xl:ml-[500px]'>
          <Image
            class='ml-2 h-[150px] w-[150px] bg-black'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='ml-2 h-[150px] w-[150px] bg-black'
            src={imaimport}
            alt='imagen de un check'
          />
          <Image
            class='ml-2 h-[150px] w-[150px] bg-black'
            src={imaimport}
            alt='imagen de un check'
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
