import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./componentes/Home";
import Navegacao from "./componentes/Navegacao";
import Pesquisar from "./componentes/Pesquisar";
import Cadastrar from "./componentes/Cadastrar";
import Deletar from "./componentes/Deletar";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Navegacao />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/pesquisar" element={<Pesquisar />} />
          <Route index path="/cadastrar" element={<Cadastrar />} />
          <Route index path="/deletar" element={<Deletar />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
