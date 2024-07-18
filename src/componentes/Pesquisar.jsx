import React, { useState } from 'react';
import axios from 'axios';
import "../../style/style.css";

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

      const response = await axios.get(`http://localhost:3000/api/veiculos/pesquisar?${queryParams}`);
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

  const handleDelete = async (codigo) => {
    const confirmDelete = window.confirm("Deseja deletar o veículo com código: " + codigo + "?");
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/veiculos/deletar', { codigo });
      alert('Veículo deletado com sucesso!');
      setResultados(resultados.filter(item => item.codigo !== codigo));
    } catch (error) {
      console.error('Erro ao deletar o veículo:', error);
      alert('Erro ao deletar o veículo. Por favor, tente novamente.');
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Pesquisar Veículo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="codigo">Código:</label>
            <input type="text" id="codigo" name="codigo" value={formulario.codigo} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formulario.nome} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="carro">Carro:</label>
            <input type="text" id="carro" name="carro" value={formulario.carro} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="motor">Motor:</label>
            <input type="text" id="motor" name="motor" value={formulario.motor} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="ano">Ano:</label>
            <input type="text" id="ano" name="ano" value={formulario.ano} onChange={handleChange} />
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
                  <div className="button-group">
                    <button onClick={() => handleDelete(item.codigo)}>Deletar</button>
                  </div>
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
