import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import Queixas from './pages/Queixas/Queixas';
import Login from './pages/Login/Login';
import Alunos from './pages/Alunos/Alunos';
import Blocos from './pages/Blocos/Blocos';
import { ContextoGambiarraProvider } from './utils/ContextoGambiarra';

function App() {
  return (
    <ContextoGambiarraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aluno/reservas" element={<Reservas />} />
          <Route path="aluno/queixas" element={<Queixas />} />
          <Route path="login" element={<Login />} />
          <Route path="admin/alunos" element={<Alunos />} />
          <Route path="admin/blocos" element={<Blocos />} />
        </Routes>
      </BrowserRouter>
    </ContextoGambiarraProvider>
  );
}

export default App;
