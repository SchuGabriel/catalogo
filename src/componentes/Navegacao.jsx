import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navegacao() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="cabecalho">
            <nav className="menu">
                <ul className="colunas">
                    <li><Link to="/" className='lista'>Home</Link></li>
                    <li><Link to="/pesquisar" className='lista'>Buscar Aplicacao</Link></li>
                    <li><Link to="/cadastrar" className='lista'>Cadastrar</Link></li>
                    <li><Link to="/editar" className='lista'>Editar cadastro</Link></li>
                    {token ? (
                        <li><button onClick={handleLogout} className='lista'>Logout</button></li>
                    ) : (
                        <>
                            <li><Link to="/login" className='lista'>Login</Link></li>
                            <li><Link to="/register" className='lista'>Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navegacao;