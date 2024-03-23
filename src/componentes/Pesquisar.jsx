import React, { useState } from 'react';

const Pesquisar = () => {
  const [codigo, setCodgio] = useState('');
  const [carro, setCarro] = useState('');
  const [motor, setMotor] = useState('');
  const [ano, setAno] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesquisou");
  }

  return (
    <div>
      <h2>Pesquisar</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Codigo:<input type="text" value={codigo}/></label>
          <label> Carro:<input type="text" value={carro}/></label>
          <label> Motor:<input type="text" value={motor}/></label>
          <label> Ano:<input type="date" value={ano}/></label>
        </div>
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
};

export default Pesquisar;
