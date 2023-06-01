import { useRef } from "react"
import "./Reserva.css"

const Reserva = ({ ativa }) => {
    const reservaRef = useRef(null)

    const toggleActiveReserve = (event) => {
        event.preventDefault()
        reservaRef.current.classList.toggle("ativo")
    }

    return (
        <div className="reserva" ref={reservaRef}>
            <header onClick={toggleActiveReserve}>
                <h1>Sala 1, bloco 1</h1>
                <h1 className={ativa ? "ativa" : "inativa"}>{ativa ? "Ativa" : "Inativa"}</h1>
            </header>
            <aside>
                <section>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Nome completo</label>
                            <input className="textfield" value={"YURI SILVA DE LIMA"} readOnly placeholder="Nome Completo" type="email" name="" id="" />
                        </div>
                        <div className="d-flex gap-2">
                            <div className="input_group flex-grow-0">
                                <label for="Remember">Matrícula</label>
                                <input className="textfield" placeholder="" value={"512414"} readOnly type="number" name="" id="" />
                            </div>
                            <div className="input_group">
                                <label for="Remember w-100">Período</label>
                                <input className="textfield info-destaque" placeholder="" value={"AB - MANHÃ"} readOnly type="text" name="" id="" />
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="input_group">
                                <div className="input_group flex-grow-1">
                                    <label for="Remember">Atividade</label>
                                    <input className="textfield info-destaque" placeholder="" value={"Estudar"} readOnly type="text" name="" id="" />
                                </div>
                            </div>
                            <div className="input_group flex-grow-0">
                                <label for="Remember">Nº de pessoas</label>
                                <input className="textfield w-50" placeholder="" value={"5"} readOnly type="number" name="" id="" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="Remember">Justificativa</label>
                            <textarea name="" readOnly value={"Estudar é bom e é porque é"} id="" cols="30" rows="10"></textarea>
                        </div>
                        <button  onClick={toggleActiveReserve} style={{ backgroundColor: "#2376D7" }}>X</button>
                    </form>
                </section>
            </aside>
        </div>
    )
}

export default Reserva