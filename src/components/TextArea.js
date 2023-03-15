import { useState } from 'react';

function TextareaConContador(props) {
  const { maxCaracteres } = props;
  const [numCaracteres, setNumCaracteres] = useState(0);

  const handleChange = (event) => {
    const texto = event.target.value;
    setNumCaracteres(texto.length);
  };

  const contadorClassName = numCaracteres > maxCaracteres ? 'text-red-500' : '';

  return (
    <div className='flex flex-col'>
      <textarea
        className='rounded-md border-0 bg-gray-200 text-sm placeholder-secondary placeholder:tracking-wider'
        name='escribe'
        id='escribe'
        cols='20'
        rows='5'
        maxLength={maxCaracteres}
        placeholder='Escribamos'
        onChange={handleChange}
      ></textarea>
      <span
        className={`absolute bottom-0 right-0 ${contadorClassName}`}
      >{`${numCaracteres}/${maxCaracteres}`}</span>
    </div>
  );
}

export default TextareaConContador;
