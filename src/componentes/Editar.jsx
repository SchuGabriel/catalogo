import React, { useState } from 'react';
import axios from 'axios';
import { validarCadastro } from '../validacao/ValidarCadastro';
import "../../style/style.css"

const Editar = () => {
  const [formulario, setFormulario] = useState({
    codigo: '',
    nome: '',
    carro: '',
    motor: '',
    ano: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleBusca = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    try {
      const queryParams = Object.entries(formulario)
        .filter(([key, value]) => value.trim() !== '')
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

      const response = await axios.get(`http://localhost:4000/api/veiculos/pesquisar?${queryParams}`);
      const data = response.data;

      console.log(data);

      if (data.message) {
        console.error('Erro ao buscar dados:', data.message);
      } else {
        const { codigo, nome, carro, motor, ano } = data[0];
        setFormulario({ codigo, nome, carro, motor, ano });
      }
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formulario);
    if (validarCadastro(formulario, "edicao")) {
      try {
        const response = await axios.put(`http://localhost:4000/api/veiculos/editar/${formulario.codigo}`, formulario);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao editar os dados:', error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Editar Aplicação</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Codigo:</label>
            <div className="input-group">
              <input type="text" id="codigo" name="codigo" value={formulario.codigo} onChange={handleChange} />
              <button id="buscarButton" onClick={handleBusca}>Buscar</button>
            </div>
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
          <button type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
};

export default Editar;
