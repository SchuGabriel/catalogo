import React, { useState } from 'react';
import axios from 'axios';

const Pesquisar = () => {
  const [codigo, setCodigo] = useState('');
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`http://localhost:4000/pesquisar?codigo=${codigo}`);
      const data = response.data;


      if (data.message) {
        setErro(data.message);
        setResultados([]);
      } else {
        setResultados([data]);
        setErro('');
      }
      console.log(data)
      console.log(resultados)
    } catch (error) {
      console.error('Erro ao pesquisar dados:', error);
      setErro('Erro ao pesquisar dados. Por favor, tente novamente.');
      setResultados([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={codigo} onChange={handleChange} />
        <button type="submit">Pesquisar</button>
      </form>
      {erro && <p>{erro}</p>}
      {resultados.length > 0 && (
  <ul>
    {resultados.map((item, index) => (
      <li key={index}>
        <p>Código: {item.codigo}</p>
        <p>Carro: {item.carro}</p>
        <p>Motor: {item.motor}</p>
        <p>Ano: {item.ano}</p>
      </li>
    ))}
  </ul>
)}
    </div>
  );
};

export default Pesquisar;