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
        .filter(([key, value]) => value.trim() !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&'); 
      
      const response = await axios.get(`http://localhost:4000/pesquisar?${queryParams}`);
      const data = response.data;
  
      if (data.message) {
        setErro(data.message);
        setResultados([]);
      } else {
        setResultados(data);
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
          <div className="form-row">
            <div className="form-group">
              <label>Codigo:</label>
              <input type="text" name="codigo" value={formulario.codigo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Nome:</label>
              <input className='input' type="text" name="nome" value={formulario.nome} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Carro:</label>
              <input type="text" name="carro" value={formulario.carro} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Motor:</label>
              <input type="text" name="motor" value={formulario.motor} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Ano:</label>
              <input type="text" name="ano" value={formulario.ano} onChange={handleChange} />
            </div>
          </div>
          <button type="submit">Pesquisar</button>
        </form>
        {erro && <p>{erro}</p>}
      </div>
      <div className='result-container'>
        {resultados.length > 0 && (
          <ul className='result-list'>
            {resultados.map((item, index) => (
              <li key={index} className="result-item">
                <div className="result-group">                  
                  <p>Código: {item.codigo}</p>
                  <p>Nome: {item.nome}</p>
                  <p>Carro: {item.carro}</p>
                  <p>Motor: {item.motor}</p>
                  <p>Ano: {item.ano}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Pesquisar;
