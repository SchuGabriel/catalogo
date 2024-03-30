import React, { useState } from 'react';
import axios from 'axios';
import "../../style/style.css"

const Pesquisar = () => {
  const [formulario, setFormulario] = useState({
    codigo: '',
    nome: '',
    carro: '',
    motor: '',
    ano: ''
  });
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = Object.entries(formulario)
        .filter(([key, value]) => value.trim() !== '') // Filtrar campos não vazios
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Codificar valores para URL
        .join('&'); // Unir os pares chave=valor com &
      
      const response = await axios.get(`http://localhost:4000/pesquisar?${queryParams}`);
      const data = response.data;
  
      if (data.message) {
        setErro(data.message);
        setResultados([]);
      } else {
        setResultados([data]);
        setErro('');
      }
    } catch (error) {
      console.error('Erro ao pesquisar dados:', error);
      setErro('Erro ao pesquisar dados. Por favor, tente novamente.');
      setResultados([]);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Pesquisar Aplicação</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Codigo:</label>
            <input type="text" name="codigo" value={formulario.codigo} onChange={handleChange} />
          </div>
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={formulario.nome} onChange={handleChange} />
          </div>
          <div>
            <label>Carro:</label>
            <input type="text" name="carro" value={formulario.carro} onChange={handleChange} />
          </div>
          <div>
            <label>Motor:</label>
            <input type="text" name="motor" value={formulario.motor} onChange={handleChange} />
          </div>
          <div>
            <label>Ano:</label>
            <input type="text" name="ano" value={formulario.ano} onChange={handleChange} />
          </div>
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
    </div>
  );
};

export default Pesquisar;
