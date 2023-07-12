import 'bootstrap/dist/js/bootstrap.js';
import './styles/App.css';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
//import { ContextoGambiarra } from './utils/ContextoGambiarra';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home';
import Reservas from './pages/Reservas/Reservas';
import Queixas from './pages/Queixas/Queixas';
import Perfil from './pages/Perfil/Perfil';
import Login from './pages/Login/Login';
import Cadastrar from './pages/Cadastrar/Cadastrar';
import Alunos from './pages/Alunos/Alunos';
import Blocos from './pages/Blocos/Blocos';
import { ContextoGambiarraProvider } from './utils/ContextoGambiarra';
//import RequereAuth from './utils/RequireAuth';
//import EditarPerfil from './pages/EditarPerfil/EditarPerfil';

const Private = ({ Item }) => {
  //const { user } = useContext(ContextoGambiarra)

  //const navigate = useNavigate()
  const id = localStorage.getItem("id")

  if (!id) {
    return <Login />
    //return navigate('/login')

  }

  return <Item />

  //return user ? <Item /> : navigate('/login')

}
//<RequereAuth> <Home/> </RequereAuth>

function App() {

  const handleIsUser = () => {
    const idStorage = localStorage.getItem("id")

    if (idStorage) {
      return <Route path="*" element={<Home />} />
    } else {
      return <Route path="*" element={<Login />} />
    }
  }

  return (
    <ContextoGambiarraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Private Item={Home} />} />
          <Route path="aluno/reservas" element={<Reservas />} />
          <Route path="aluno/queixas" element={<Queixas />} />
          <Route path="aluno/perfil" element={<Perfil />} />
          {/* <Route path="aluno/editar" element={<EditarPerfil />} /> */}
          {handleIsUser()}
          {/* <Route path="*" element={<Login />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="cadastrar" element={<Cadastrar />} />
          <Route path="admin/alunos" element={<Alunos />} />
          <Route path="admin/blocos" element={<Blocos />} />
          <Route path="admin/perfil" element={<Perfil />} />
          {/* <Route path="admin/editar" element={<EditarPerfil />} /> */}
        </Routes>
      </BrowserRouter>
    </ContextoGambiarraProvider>
  );
}

export default App;
