// import { Box, TextField } from "@mui/material"
import logo from "../../assets/imgs/complete_logo.png"
import { Link, useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()
        navigate("/")
    }

    return (
        <div className="login box h-100 d-flex justify-content-center gap-3 flex-column">
            <div className="d-flex flex-row justify-content-center w-75">
                <img src={logo} alt="logo" className="img-fluid"/>
            </div>
            <form action="">
                <div className="input_group">
                    <label for="Remember">Digite seu email</label>
                    <input className="textfield" placeholder="Email" type="email" name="" id="" />
                </div>
                <div className="input_group">
                    <label for="Remember">Digite sua senha</label>
                    <input className="textfield" placeholder="Senha" type="password" name="" id="" />
                </div>
                <div className="input_radio">
                    <input type="checkbox" id="Remember" value={"Lembrar minha senha"} />
                    <label for="Remember">Lembrar minha senha</label>
                </div>
                <button type="submit" className="w-100" onClick={handleLogin}>ENTRAR</button>
            </form>
            <span>Não possui conta? <Link to="cadastrar">Cadastrar</Link></span>
        </div>
    )
}

export default Login