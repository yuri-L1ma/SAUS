import logo from "../../assets/imgs/complete_logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
//import axios from "axios";
import { useContext, useState } from "react";
import { ContextoGambiarra } from "../../utils/ContextoGambiarra";

const Login = () => {
    const navigate = useNavigate()

    const { loginAluno, loginAdmin } = useContext(ContextoGambiarra)

    const [isUserAdmin, setIsUserAdmin] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // const isLogged = loginAluno(email, senha)
        //     console.log(isLogged)
        //     if(isLogged) {
        //         navigate("/")
        //     } else {
        //         alert("Email ou senha incorretos!")
        //     }

        if (!isUserAdmin) {
            const isLogged = await loginAluno(email, senha)
            if (isLogged.data) {
                navigate("/")
            } else {
                alert("Email ou senha incorretos!")
            }
        } else {
            const isLogged = await loginAdmin(email, senha)
            if (isLogged.data) {
                navigate("/")
            } else {
                alert("Email ou senha incorretos!")
            }
        }

        //     axios.post("http://localhost:3002/login", { email, senha })
        //         .then((response) => {
        //             alert("Bem vindo, " + response.data.nome + "!");
        //             navigate("/")
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // } else {
        //     axios.post("http://localhost:3002/admin/login", { email, senha })
        //         .then((response) => {
        //             alert("Bem vindo, " + response.data.nome + "!");
        //             navigate("/")
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }

    };

    return (
        <div className="login box h-100 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
            <div className="d-flex flex-row justify-content-center w-75">
                <img src={logo} alt="logo" style={{ maxWidth: "350px"}} className="img-fluid" />
            </div>
            <form className="w-75">
                <div className="input_group">
                    <label for="Remember">Digite seu email</label>
                    <input
                        className="textfield"
                        placeholder="Email"
                        type="email"
                        name="senha"
                        id="email"
                    />
                </div>
                <div className="input_group">
                    <label for="Remember">Digite sua senha</label>
                    <input
                        className="textfield"
                        placeholder="Senha"
                        type="password"
                        name="senha"
                        id="senha"
                    />
                </div>
                <div className="input_group">
                    <label for="Remember">Selecione o tipo de usuário:</label>
                    <div className="radio_buttons d-flex justify-content-start gap-3">
                        <div className="input_group d-flex flex-row align-items-center gap-3 justify-content-center">
                            <input
                                type="radio"
                                id="aluno"
                                name="userType"
                                value="aluno"
                                checked={!isUserAdmin}
                                onChange={() => setIsUserAdmin(false)}
                            />
                            <label for="aluno">Aluno</label>
                        </div>
                        <div className="input_group d-flex flex-row align-items-center gap-3 justify-content-center">
                            <input
                                type="radio"
                                id="admin"
                                name="userType"
                                value="admin"
                                checked={isUserAdmin}
                                onChange={() => setIsUserAdmin(true)}
                            />
                            <label for="admin">Admin</label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="w-100" onClick={handleLogin}>
                    ENTRAR
                </button>
                <span>
                    Não possui conta? <Link to="/cadastrar">Cadastrar</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
