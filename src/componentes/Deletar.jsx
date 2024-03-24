import React, { useState } from 'react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formulario)
    if (validarCadastro(formulario, "deletar")){
      alert("Validou")
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
