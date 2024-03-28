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
    anoDe: '',
    anoAte: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formulario);
    if (validarCadastro(formulario,"edicao")){
      alert("Validou");
    }
  };

  return (
    <div className='container'>
    <div className='form-container'>
      <h2>Editar Aplicação</h2>
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
          <label>De:</label>
          <input type="date" name="anoDe" value={formulario.anoDe} onChange={handleChange} />
        </div>
        <div>
          <label>Até:</label>
          <input type="date" name="anoAte" value={formulario.anoAte} onChange={handleChange} />
        </div>
        <button type="submit">Editar</button>
      </form>
    </div>
    </div>
  );
};

export default Editar;
