import './styles/App.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu from "./components/Menu/Menu"
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import Queixas from './pages/Queixas/Queixas';
// import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <main className='p-4'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aluno/reservas" element={<Reservas />} />
          <Route path="aluno/queixas" element={<Queixas />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
