import seta_azul from "../../assets/icons/setaAzul.svg"
import Menu from "../../components/Menu/Menu"
import { NavLink } from "react-router-dom"
import Reserva from "../../components/Reserva/Reserva"

const Reservas = () => {
    const reservas = [{ ativa: true }, { ativa: false }, { ativa: false }, { ativa: true }]
    return (
        <>
            <Menu />
            <main>

                <NavLink to={"/"} className={"d-md-none text-decoration-none"}>
                    <div className="item d-flex gap-2 pb-3">
                        <span className="icon">
                            <img src={seta_azul} alt="" />
                        </span>
                        <h1 style={{ color: '#2376D7', fontWeight: "bolder" }}>Minhas Reservas</h1>
                    </div>
                </NavLink>
                <section className="reservas mt-2">
                    <div className="d-flex flex-column gap-4">
                        {
                            reservas.map((reserva) => {
                                return <Reserva ativa={reserva.ativa} />
                            })
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reservas