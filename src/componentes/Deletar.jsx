import React, { useState } from 'react';
import axios from 'axios';
import { validarCadastro } from '../validacao/ValidarCadastro';
import "../../style/style.css"

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
    console.log(formulario)
    if (validarCadastro(formulario, "deletar")){
      try {
        await axios.post('http://localhost:4000/deletar', formulario);
        alert('Aplicação deletada com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar os dados:', error);
        alert('Erro ao deletar a aplicação. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <h2>Deletar Aplicação</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Codigo:</label>
            <input type="text" name="codigo" value={formulario.codigo} onChange={handleChange} />
          </div>
          <button type="submit">Deletar</button>
        </form>
      </div>
    </div>
  );
};

export default Deletar;
