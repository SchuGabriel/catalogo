import { Link } from 'react-router-dom';
import React from "react";


function Navegacao() {
    return (
        <header className="cabecalho">
            <nav className="menu">
                <ul className="colunas">
                    <li><Link to="/" className='lista'>Home</Link></li>
                    <li><Link to="/pesquisar">Buscar Aplicacao</Link></li>
                    <li><Link to="/cadastrar">Cadastrar</Link></li>
                    <li><Link to="/editar">Editar cadastro</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navegacao;