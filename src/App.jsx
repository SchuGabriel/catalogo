// src/App.jsx
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./componentes/Home";
import Navegacao from "./componentes/Navegacao";
import Pesquisar from "./componentes/Pesquisar";
import Cadastrar from "./componentes/Cadastrar";
import Editar from "./componentes/Editar";
import Deletar from "./componentes/Deletar";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import ProtectedComponent from "./componentes/ProtectedComponent";
import ProtectedRoute from "./componentes/ProtectedRoute";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navegacao />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pesquisar" element={<ProtectedRoute><Pesquisar /></ProtectedRoute>} />
          <Route path="/cadastrar" element={<ProtectedRoute><Cadastrar /></ProtectedRoute>} />
          <Route path="/editar" element={<ProtectedRoute><Editar /></ProtectedRoute>} />
          <Route path="/deletar" element={<ProtectedRoute><Deletar /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/protected" element={<ProtectedRoute><ProtectedComponent /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
