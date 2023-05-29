// import { Box, TextField } from "@mui/material"
import logo from "../assets/imgs/complete_logo.png"
import css from "./Login.css"

const Login = () => {
    return (
        <div className="center">
            <div className="container">
                <div className="img_container">
                    <img src={logo} alt="" srcset="" />
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
                        <input type="checkbox" id="Remember" value={"Lembrar minha senha"}/>
                        <label for="Remember">Lembrar minha senha</label>
                    </div>
                    <button type="submit">ENTRAR</button>
                </form>
                <h5>Não possui conta? <a className="bolder">Cadastrar</a></h5>
            </div>
        </div>
    )
}

export default Login