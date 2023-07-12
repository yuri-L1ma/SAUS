import "./Reservas.css"
import seta_azul from "../../assets/icons/setaAzul.svg"
import Menu from "../../components/Menu/Menu"
import { NavLink } from "react-router-dom"
import Reserva from "../../components/Reserva/Reserva"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import axios from "axios"

const Reservas = () => {
    const [reservas, setReservas] = useState([])
    const { user } = useContext(ContextoGambiarra)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        initComponents()
    }, [])

    useEffect(() => {
        initComponents()
    }, [user])

    const initComponents = async () => {
        try {
            let reservas = await axios.get(`http://localhost:3002/reservas/aluno/${user.id}`)
        
            let reservasOrdenadas = reservas.data.sort((a, b) => (b.ativa - a.ativa))
            
            setReservas(reservasOrdenadas)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

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
                        {loading && <div className="load"><div className="circle"></div></div>}
                        {reservas.length > 0 ?
                            reservas.map((reserva) => {
                                return <Reserva reserva={reserva} updateReservas={initComponents} />
                            }) : loading ? null :
                            <div className="d-flex flex-column gap-4 flex-md-row notem">
                                <h1 className="w-100 d-flex justify-content-center align-items-center" style={{fontSize:"10rem", color: "#2376D7"}}>:(</h1>
                                <div className="w-100 d-flex gap-3 flex-column justify-content-center">
                                    <h1 style={{color: "#2376D7"}}>Você não tem reservas feitas no sistema!</h1>
                                    <p>Vá na aba home, procure uma sala disponível e faça sua reserva</p>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reservas