import React from 'react';
import '../../style/style.css';

const Home = () => {
  return (
    <div className="container">
      <header>
        <h1>Bem-vindo ao nosso catálogo!</h1>
      </header>
      <main>
        <section id="secao1" className="form-container">
          <h2>Produtos em Destaque</h2>
          <form>
            <div className="input-group">
              <div className="form-group">
                <label htmlFor="codigo">Código:</label>
                <input type="text" id="codigo" />
              </div>
              <button id="buscarButton" type="submit">Buscar</button>
            </div>
          </form>
        </section>
        <section id="secao2" className="result-container">
          <h2>Busca Rápida</h2>
          <ul className="result-list">
            <li className="result-item">
              <div className="result-group">
                <p>Código: 123456</p>
                <p>Descrição: Peça XYZ</p>
              </div>
              <div className="button-group">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </li>
            <li className="result-item">
              <div className="result-group">
                <p>Código: 789012</p>
                <p>Descrição: Peça ABC</p>
              </div>
              <div className="button-group">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </li>
          </ul>
        </section>
        <section id="secao3" className="result-container">
          <h2>Novidades</h2>
          <ul className="result-list">
            <li className="result-item">
              <div className="result-group">
                <p>Código: 345678</p>
                <p>Descrição: Nova Peça 123</p>
              </div>
              <div className="button-group">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </li>
            <li className="result-item">
              <div className="result-group">
                <p>Código: 901234</p>
                <p>Descrição: Nova Peça 456</p>
              </div>
              <div className="button-group">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>Rodapé - © 2024 Catálogo Inteligente de Auto Peças</p>
      </footer>
    </div>
  );
};

export default Home;
