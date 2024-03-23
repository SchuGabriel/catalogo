import React, { useState } from 'react';
import axios from 'axios';
import { validarCadastro } from '../validacao/ValidarCadastro'; 

const Cadastrar = () => {
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
    if (validarCadastro(formulario,"cadastro")){
      alert("Validou");
      try {
        // Faz uma requisição POST para o servidor na porta 4000
        await axios.post('http://localhost:4000/cadastrar', formulario);
        alert('Dados cadastrados com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar os dados:', error);
        alert('Erro ao cadastrar os dados. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div>
      <h2>Cadastrar Aplicação</h2>
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
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastrar;
