import "./Menu.css"
import logo from "../../assets/imgs/simplified_logo.png"
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
                    <ul className="nav gap-4 flex-nowrap">
                        <div className="d-flex h-100 flex-column justify-content-between">
                            <div className="d-flex gap-3 flex-column">
                                <li className="nav-item">
                                    <NavLink onClick={closeMenu} to={"/"} className={"nav-link text-light"}>
                                        <div className="d-flex gap-3">
                                            <Home size={24} />
                                            <span>Home</span>
                                        </div>
                                    </NavLink>
                                </li>
                                {admin ?
                                    <>
                                        <li className="nav-item">
                                            <NavLink onClick={closeMenu} to={"/admin/alunos"} className={"nav-link text-light"}>
                                                <div className="d-flex gap-3">
                                                    <Users2 size={24} />
                                                    <span>Alunos</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink onClick={closeMenu} to={"/admin/blocos"} className={"nav-link text-light"}>
                                                <div className="d-flex gap-3">
                                                    <Building2 size={24} />
                                                    <span>Blocos</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink onClick={closeMenu} to={"/admin/perfil"} className={"nav-link text-light"}>
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
                                            <NavLink onClick={closeMenu} to={"/aluno/reservas"} className={"nav-link text-light"}>
                                                <div className="d-flex gap-3">
                                                    <Ticket size={24} />
                                                    <span>Reservas</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item w-100">
                                            <NavLink onClick={closeMenu} to={"/aluno/queixas"} className={"nav-link text-light"}>
                                                <div className="d-flex gap-3">
                                                    <Megaphone size={24} />
                                                    <span>Queixas</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item w-100">
                                            <NavLink onClick={closeMenu} to={"/aluno/perfil"} className={"nav-link text-light"}>
                                                <div className="d-flex gap-3">
                                                    <UserCircle size={24} />
                                                    <span>Perfil</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </>
                                }

                            </div>
                            <div>
                                <li className="nav-item">
                                    <NavLink onClick={closeMenu} to={"/login"} className={"nav-link bg-danger text-light"}>
                                        <div className="d-flex gap-3">
                                            <LogOut size={24} />
                                            <span>Sair</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Menu