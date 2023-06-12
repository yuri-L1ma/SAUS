import "./Menu.css"
import logo from "../../assets/imgs/simplified_logo.png"
import perfil_icon from "../../assets/icons/user.svg"
import editar_icon from "../../assets/icons/editar.svg"
import reservas_icon from "../../assets/icons/calendar.svg"
import queixas_icon from "../../assets/icons/queixa.svg"
import config_icon from "../../assets/icons/config.svg"
import sair_icon from "../../assets/icons/setaSair.svg"
import bars_icon from "../../assets/icons/bars.svg"

import { NavLink, Link } from "react-router-dom"
import { Building2, Home, Megaphone, Ticket, Users2, UserCircle, ArrowLeftRight, LogOut } from "lucide-react"
import { useContext } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"

const Menu = () => {
    const { admin, updateAdmin } = useContext(ContextoGambiarra)

    const toogleMenu = () => {
        const menu = document.querySelector(".menu-colapse")
        menu.classList.toggle("ativo")
    }

    const closeMenu = () => {
        const menu = document.querySelector(".menu-colapse")
        menu.classList.remove("ativo")
    }

    const tooglePoder = () => {
        updateAdmin()
    }

    return (
        <>
            <nav className="menu">
                <div className="box">
                    <div className="img_container">
                        <Link to={"/"}>
                            <img onClick={closeMenu} src={logo} alt="" />
                        </Link>
                    </div>
                    <div className="gambiarra">
                        <button className="d-flex align-items-center gap-3 w-100 h-100 gambiarra" onClick={tooglePoder}>
                            <span>{admin ? "Admin" : "Aluno"}</span>
                            <ArrowLeftRight size={24} />
                            <span>{!admin ? "Admin" : "Aluno"}</span>
                        </button>
                    </div>
                    <button onClick={toogleMenu} type="button">
                        <img src={bars_icon} alt="" />
                    </button>
                    <ul className="nav gap-4 flex-nowrap">
                        <li className="nav-item">
                            <NavLink to={"/"} className={"nav-link"}>
                                <div className="d-flex gap-3">
                                    <Home size={24} />
                                    <span>Home</span>
                                </div>
                            </NavLink>
                        </li>
                        {admin ?
                            <>
                                <li className="nav-item">
                                    <NavLink to={"/admin/alunos"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <Users2 size={24} />
                                            <span>Alunos</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={"/admin/blocos"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <Building2 size={24} />
                                            <span>Blocos</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={"/admin/perfil"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <UserCircle size={24} />
                                            <span>Perfil</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <NavLink to={"/aluno/reservas"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <Ticket size={24} />
                                            <span>Reservas</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink to={"/aluno/queixas"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <Megaphone size={24} />
                                            <span>Queixas</span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="nav-item w-100">
                                    <NavLink to={"/aluno/perfil"} className={"nav-link"}>
                                        <div className="d-flex gap-3">
                                            <UserCircle size={24} />
                                            <span>Perfil</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </>
                        }
                        <li className="nav-item">
                            <NavLink to={"/login"} className={"nav-link bg-danger text-light"}>
                                <div className="d-flex gap-3">
                                    <LogOut size={24} />
                                    <span>Sair</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className="menu-colapse">
                <div className="dontbreak">
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
                                    <NavLink onClick={closeMenu} to={"/aluno/reservas"} className={"text-light text-decoration-none"}>
                                        <h5>Minhas reservas</h5>
                                    </NavLink>
                                </div>
                                <div className="item d-flex gap-2 border-bottom pb-2">
                                    <span className="icon">
                                        <img src={queixas_icon} alt="" />
                                    </span>
                                    <NavLink onClick={closeMenu} to={"/aluno/queixas"} className={"text-light text-decoration-none"}>
                                        <h5>Minhas queixas</h5>
                                    </NavLink>
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
                </div>
            </nav>
        </>
    )
}

export default Menu