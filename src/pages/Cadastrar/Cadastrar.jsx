import logo from "../../assets/imgs/complete_logo.png"
import { Link, useNavigate } from "react-router-dom"
import "./Cadastrar.css"
import axios from "axios"

const Cadastrar = () => {
    const navigate = useNavigate()

    const handleCadastrar = (event) => {
        event.preventDefault()

        const nome = document.getElementById("nome").value
        const email = document.getElementById("email").value
        const matricula = document.getElementById("matricula").value
        const curso = document.getElementById("curso").value
        const semestre = document.getElementById("semestre").value
        const senha = document.getElementById("senha").value

        const user = { nome, email, senha }

        axios.post("http://localhost:3002/alunos/cadastrar", { user, matricula, curso, semestre })
            .then((response) => {
                alert("Aluno " + response.data.user.nome + " cadastrado com sucesso!")
                navigate("/login")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="cadastrar box h-100 d-flex flex-column flex-md-row justify-content-center align-items-center gap-5">
            <div className="d-flex flex-row justify-content-center w-75">
                <img src={logo} alt="logo" style={{ maxWidth: "350px" }} className="img-fluid" />
            </div>
            <form className="d-flex flex-column gap-3 w-100">

                <div className="input_group">
                    <label for="Remember">Qual o seu nome?</label>
                    <input className="textfield" placeholder="Nome" type="text" name="nome" id="nome" />
                </div>

                <div className="input_group">
                    <label for="Remember">Pode me dizer seu email?</label>
                    <input className="textfield" placeholder="Email" type="email" name="email" id="email" />
                </div>


                <div className="d-flex flex-column flex-md-row gap-3">
                    <div className="input_group">
                        <label for="Remember" className="text-nowrap">E a sua matrícula?</label>
                        <input className="textfield" placeholder="Matrícula" type="number" name="matricula" id="matricula" />
                    </div>

                    <div className="input_group">
                        <label for="curso">Que curso você faz?</label>
                        <select id="curso" name="curso" >
                            <option value="" style={{ display: "none" }} disabled selected>Escolha seu curso</option>
                            <option value="Design Digital">Design Digital</option>
                            <option value="Engenharia de Software">Engenharia de Software</option>
                            <option value="Ciência da Computação">Ciência da Computação</option>
                            <option value="Sistemas de Informação">Sistemas de Informação</option>
                            <option value="Engenharia de Computação">Engenharia de Computação</option>
                            <option value="Redes de Computadores">Redes de Computadores</option>
                        </select>
                    </div>

                    <div className="input_group">
                        <label for="semestre">Você está em qual semestre?</label>
                        <select id="semestre" name="semestre" >
                            <option value="" style={{ display: "none" }} disabled selected>Escolha seu semestre</option>
                            <option value={1}>1° Semestre</option>
                            <option value={2}>2° Semestre</option>
                            <option value={3}>3° Semestre</option>
                            <option value={4}>4° Semestre</option>
                            <option value={5}>5° Semestre</option>
                            <option value={6}>6° Semestre</option>
                            <option value={7}>7° Semestre</option>
                            <option value={8}>8° Semestre</option>
                        </select>
                    </div>
                </div>

                <div className="input_group">
                    <label for="Remember">Coloca uma senha segura, ok?</label>
                    <input className="textfield" placeholder="Senha" type="password" name="senha" id="senha" />
                </div>

                <button type="submit" className="w-100" onClick={handleCadastrar}>REGISTRAR</button>
                <span>
                    Já tem uma conta? <Link to="/login" style={{}}>Faça login</Link>
                </span>
            </form>
        </div>
    )
}

export default Cadastrar