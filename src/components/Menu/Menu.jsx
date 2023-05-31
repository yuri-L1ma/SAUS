import "./Menu.css"
import logo from "../../assets/imgs/simplified_logo.png"
import perfil_icon from "../../assets/icons/user.svg"
import editar_icon from "../../assets/icons/editar.svg"
import reservas_icon from "../../assets/icons/calendar.svg"
import queixas_icon from "../../assets/icons/queixa.svg"
import config_icon from "../../assets/icons/config.svg"
import sair_icon from "../../assets/icons/setaSair.svg"

const Menu = () => {
    const toogleMenu = () => {
        const menu = document.querySelector(".menu-colapse")
        menu.classList.toggle("ativo")
    }
    return (
        <>
            <nav className="menu">
                <div className="img_container">
                    <img src={logo} alt="" />
                </div>
                <button onClick={toogleMenu} type="button">☰</button>
            </nav>
            <nav className="menu-colapse ativo">
                <ul>

                    <div className="list-item">
                        <div className="item d-flex gap-3 border-bottom pb-3">
                            <span className="icon">
                                <img src={perfil_icon} alt="" />
                            </span>
                            <h4>Meu perfil</h4>
                        </div>
                        <div className="d-flex flex-column gap-4 ms-4 my-4">
                            <div className="item button d-flex gap-2 align-items-center pb-2" style={{ borderBottom: "1px solid #ffffff6c" }}>
                                <span className="icon">
                                    <img src={editar_icon} alt="" />
                                </span>
                                <h5>Editar</h5>
                            </div>
                            <div className="item d-flex gap-2  border-bottom pb-2">
                                <span className="icon">
                                    <img src={reservas_icon} alt="" />
                                </span>
                                <h5>Minhas reservas</h5>
                            </div>
                            <div className="item d-flex gap-2 border-bottom pb-2">
                                <span className="icon">
                                    <img src={queixas_icon} alt="" />
                                </span>
                                <h5>Minhas queixas</h5>
                            </div>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="item d-flex gap-3 pb-3">
                            <span className="icon">
                                <img src={config_icon} alt="" />
                            </span>
                            <h4>Configurações</h4>
                        </div>
                    </div>
                    <div className="list-item">
                        <div className="item d-flex gap-3 pb-3">
                            <span className="icon">
                                <img src={sair_icon} alt="" />
                            </span>
                            <h4>Sair</h4>
                        </div>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default Menu