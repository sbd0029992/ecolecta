import React from 'react';

function user_list_verification() {
  let nombre = 'Diego Salvatierra';
  var valdes = 20;
  return (
    <div class='h-[100vh] bg-[#4D7C0F]'>
      <div class='mb-[20px] h-auto w-auto rounded-b-3xl bg-white pt-[15px] pb-[25px]'>
        <button class=' ml-[390px] mr-[25px] md:collapse'> ||| </button>
        <div class='flex h-auto w-auto place-content-center'>
          <label class=' text-2xl'> Lista de usuarios listos</label>
        </div>
        <div class='mt-[50px] flex h-auto w-auto place-content-center'>
          <label class='grid h-[25px] w-[100px] place-content-center rounded-3xl bg-[#6a8d3e] text-white'>
            Usuarios
          </label>
        </div>
      </div>
      <div class=' grid w-auto place-content-center'>
        <div class='mb-[20px] flex items-center rounded-xl bg-white p-[10px]'>
          <label class='text-2xl'>{valdes} </label>
          <label class='ml-[5px] mr-[5px] text-2xl'>|</label>
          <label class='mr-[5px] text-2xl'>{nombre} </label>
          <div class='h-[25px] w-[25px] rounded-full bg-[#3bf027]'></div>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#5aa646]'></button>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#ff0505]'></button>
        </div>
        <div class='mb-[20px] flex items-center rounded-xl bg-white p-[10px]'>
          <label class='text-2xl'>{valdes} </label>
          <label class='ml-[5px] mr-[5px] text-2xl'>|</label>
          <label class='mr-[5px] text-2xl'>{nombre} </label>
          <div class='h-[25px] w-[25px] rounded-full bg-[#3bf027]'></div>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#5aa646]'></button>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#ff0505]'></button>
        </div>
        <div class='mb-[20px] flex items-center rounded-xl bg-white p-[10px]'>
          <label class='text-2xl'>{valdes} </label>
          <label class='ml-[5px] mr-[5px] text-2xl'>|</label>
          <label class='mr-[5px] text-2xl'>{nombre} </label>
          <div class='h-[25px] w-[25px] rounded-full bg-[#3bf027]'></div>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#5aa646]'></button>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#ff0505]'></button>
        </div>
        <div class='mb-[20px] flex items-center rounded-xl bg-white p-[10px]'>
          <label class='text-2xl'>{valdes} </label>
          <label class='ml-[5px] mr-[5px] text-2xl'>|</label>
          <label class='mr-[5px] text-2xl'>{nombre} </label>
          <div class='h-[25px] w-[25px] rounded-full bg-[#3bf027]'></div>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#5aa646]'></button>
          <button class='ml-[10px] h-[35px] w-[35px] rounded-full bg-[#ff0505]'></button>
        </div>
      </div>
    </div>
  );
}

export default user_list_verification;
