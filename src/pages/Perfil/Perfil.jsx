//import { NavLink } from 'react-router-dom'
import Menu from '../../components/Menu/Menu'
import './Perfil.css'
import { useContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
//import { ModalBody, ModalHeader, ModalSection } from "../../components/Modal/Modal";
import { ContextoGambiarra } from '../../utils/ContextoGambiarra'
import axios from 'axios'

const Perfil = () => {

    const navigate = useNavigate()

    const { admin, user } = useContext(ContextoGambiarra)
    //const [modalEditPerfil, setModalEditPerfil] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [curso, setCurso] = useState("")
    const [matricula, setMatricula] = useState("")
    const [semestre, setSemestre] = useState("")
    const [cpf, setCpf] = useState("")
    const [cargo, setCargo] = useState("")


    useEffect(
        () => {
            if (admin) {
                axios.get(`http://localhost:3002/admin/retrieve/${user.id}`)
                    .then(
                        (response) => {
                            setNome(response.data.nome)
                            setEmail(response.data.email)
                            setSenha(response.data.senha)
                            setCpf(response.data.cpf)
                            setCargo(response.data.cargo)

                            console.log(response.data)
                        }
                    )
                    .catch(error => console.log(error))
            } else {
                axios.get(`http://localhost:3002/alunos/retrieve/${user.id}`)
                    .then(
                        (response) => {
                            setNome(response.data.nome)
                            setEmail(response.data.email)
                            setSenha(response.data.senha)
                            setCurso(response.data.curso)
                            setMatricula(response.data.matricula)
                            setSemestre(response.data.semestre)

                            console.log(response.data)
                        }
                    )
                    .catch(error => console.log(error))
            }
            console.log(nome, email, senha, curso, matricula, semestre)
        }
        ,
        [user]
    )


    const handleUpdatePerfilAluno = (event) => {
        event.preventDefault()

        const usuario = { nome, email, senha }
        const aluno = { curso, matricula, semestre}

        const usuarioID = user.user_id
        const alunoID = user.id

        console.log(usuario, aluno)

        axios.put(`http://localhost:3002/alunos/atualizar/${alunoID}/${usuarioID}`, {user: usuario, aluno: aluno})
            .then((response) => {
                alert("Perfil do " + response.data.nome + " atualizado com sucesso!")
                navigate("/admin/perfil")

            }).catch((error) => {
                console.log(error)
            })
    }

    const handleUpdatePerfilAdmin = (event) => {
        event.preventDefault()

        const usuario = { nome, email, senha }
        const adm = {cpf, cargo}

        const usuarioID = user.user_id
        const admID = user.id

        console.log(usuario, adm)

        axios.put(`http://localhost:3002/admin/atualizar/${admID}/${usuarioID}`, {user: usuario, adm: adm })
            .then((response) => {
                alert("Perfil do " + response.data.nome + " atualizado com sucesso!")
                navigate("/admin/perfil")

            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Menu />
            <h2 className="text-center mt-5">Editar Perfil</h2>
            {admin ?
                <main>
                    <form onSubmit={handleUpdatePerfilAdmin} className="d-flex flex-column gap-3 w-100">
                        <div className="mt-3 d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="nome">Nome</label>
                                <input
                                    className="textfield"
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    id="nome"
                                    onChange={(event) => setNome(event.target.value)}
                                    value={nome}
                                />
                            </div>

                            <div className="input_group">
                                <label for="email">Email</label>
                                <input
                                    className="textfield"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className="mt-3 d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="cpf">CPF</label>
                                <input
                                    className="textfield"
                                    type="text"
                                    placeholder="CPF"
                                    name="cpf"
                                    id="cpf"
                                    onChange={(event) => setCpf(event.target.value)}
                                    value={cpf}
                                />
                            </div>

                            <div className="input_group">
                                <label for="cargo">Cargo</label>
                                <input
                                    className="textfield"
                                    placeholder="Cargo"
                                    type="text"
                                    name="cargo"
                                    id="cargo"
                                    onChange={(event) => setCargo(event.target.value)}
                                    value={cargo}
                                />
                            </div>
                        </div>

                        <div className="mt-3 input_group">
                            <label for="senha">Senha</label>
                            <input
                                className="textfield"
                                placeholder="Senha"
                                type="password"
                                name="senha"
                                id="senha"
                                onChange={(event) => setSenha(event.target.value)}
                                value={senha}
                            />
                        </div>
                        <div className="mt-5 d-flex align-items-md-center justify-content-center">
                            <button type="submit" className="blue" >Editar</button>
                        </div>
                    </form>
                </main>
                :
                <main>
                    <form onSubmit={handleUpdatePerfilAluno} className="d-flex flex-column gap-3 w-100">
                        <div className="mt-3 d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="nome">Nome</label>
                                <input
                                    className="textfield"
                                    type="text"
                                    placeholder="Nome"
                                    name="nome"
                                    id="nome"
                                    onChange={(event) => setNome(event.target.value)}
                                    value={nome}
                                />
                            </div>
                            <div className="input_group">
                                <label for="email">Email</label>
                                <input
                                    className="textfield"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className="mt-3 d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="matricula">Matrícula</label>
                                <input
                                    className="textfield"
                                    type="number"
                                    // placeholder="Matrícula"
                                    name="matricula"
                                    id="matricula"
                                    onChange={(event) => setMatricula(event.target.value)}
                                    value={matricula}
                                />
                            </div>
                            <div className="input_group">
                                <label for="curso">Curso</label>
                                <input
                                    className="textfield"
                                    placeholder="Curso"
                                    type="text"
                                    name="curso"
                                    id="curso"
                                    onChange={(event) => setCurso(event.target.value)}
                                    value={curso}
                                />
                            </div>
                            <div className="input_group">
                                <label for="semestre">Semestre</label>
                                <input
                                    className="textfield"
                                    placeholder="Semestre"
                                    type="number"
                                    name="semestre"
                                    id="semestre"
                                    onChange={(event) => setSemestre(event.target.value)}
                                    value={semestre}
                                />
                            </div>
                        </div>

                        <div className="mt-3 input_group">
                            <label for="senha">Senha</label>
                            <input
                                className="textfield"
                                placeholder="Senha"
                                type="password"
                                name="senha"
                                id="senha"
                                onChange={(event) => setSenha(event.target.value)}
                                value={senha}
                            />
                        </div>
                        <div className="mt-5 d-flex align-items-md-center justify-content-center">
                            <button type="submit" className="blue">Editar</button>
                        </div>
                    </form>
                </main>
            }
        </>
    )
}

export default Perfil