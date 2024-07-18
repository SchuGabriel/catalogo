import React, { useState } from 'react';
import axios from 'axios';
import { validarCadastro } from '../validacao/ValidarCadastro';
import "../../style/style.css";

const Deletar = () => {
  const [formulario, setFormulario] = useState({
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formulario);
    if (validarCadastro(formulario, "deletar")) {
      try {
        await axios.post('http://localhost:3000/api/veiculos/deletar', { codigo: formulario.codigo });
        alert('Veículo deletado com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar o veículo:', error);
        alert('Erro ao deletar o veículo. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Deletar Veículo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Código:</label>
            <input type="text" name="codigo" value={formulario.codigo} onChange={handleChange} />
          </div>
          <button type="submit">Deletar</button>
        </form>
      </div>
    </div>
  );
};

export default Deletar;
