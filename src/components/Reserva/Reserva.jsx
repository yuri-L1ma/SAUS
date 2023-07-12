import { useContext, useRef } from "react"
import "./Reserva.css"
import { XIcon, TrashIcon } from "lucide-react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import moment from "moment"

const Reserva = ({ reserva }) => {
    const reservaRef = useRef(null)
    const { admin } = useContext(ContextoGambiarra)

    const toggleActiveReserve = (event) => {
        event.preventDefault()
        reservaRef.current.classList.toggle("ativo")
    }

    const DayElement = ({ day }) => {
        return (
            <div className="d-flex flex-grow-1 gap-3 flex-column p-3 bordinha rounded">
                <span className="text-dark text-nowrap font-weight-light">{moment(day.dia).format("dddd, DD [de] MMMM")}</span>
                <div className="d-flex gap-3">
                    {day.turnos.map((turno) => <TurnoElement turno={turno} />)}
                </div>
            </div>
        )
    }

    const TurnoElement = ({ turno }) => {
        return (
            <>
                <div class="turno-element d-flex justify-content-center align-items-center p-2 flex-grow-1" data-turno-id={turno._id}>
                    <span className="text-nowrap text-dark ">{turno.nome}</span>
                </div>
            </>
        )
    }

    return (
        <div className="reserva" ref={reservaRef}>
            <header onClick={toggleActiveReserve}>
                <h1>{reserva.atividade}</h1>
                <h1 className={reserva.ativa ? "ativa" : "inativa"}>{reserva.ativa ? "Ativa" : "Inativa"}</h1>
            </header>
            <aside>
                <section>
                    <form action="" className="d-flex flex-column gap-3 w-100">
                        <div className="d-flex flex-column gap-3 gap-md-5 flex-md-row">
                            <div className="d-flex flex-column gap-3 ">
                                <div className="d-flex gap-3 flex-column">
                                    <div className="input_group">
                                        <label>Local</label>
                                        <div className="d-flex align-items-center ">
                                            <h3 className="text-nowrap">{reserva.sala.nome}, Bloco {reserva.sala.bloco.numero}</h3>
                                        </div>
                                    </div>
                                    <div className="input_group">
                                        <label for="Remember" className="text-nowrap">Nº de pessoas</label>
                                        <h3 className="text-nowrap">{reserva.qtdAlunos} pessoas</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="input_group justificativa">
                                <label for="Remember">Justificativa</label>
                                <textarea name="" readOnly value={reserva.justificativa}></textarea>
                            </div>
                            <div className="input_group">
                                <label for="Remember">Dias</label>
                                <div className="d-flex gap-3 mh-50">
                                    {reserva.dias.map((dia) => {
                                        return <DayElement day={dia} />
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-between justify-content-md-end">
                            {!admin ?
                                <button onClick={toggleActiveReserve} className="d-flex gap-2 justify-content-around align-self-end w-auto red">
                                    <TrashIcon size={24} />
                                    <span>Cancelar reserva</span>
                                </button>
                                : null}
                            <button onClick={toggleActiveReserve} className="d-flex gap-2 justify-content-center w-auto d-md-none">
                                <XIcon size={24} />
                                <span>Fechar</span>
                            </button>
                        </div>
                    </form>
                </section>
            </aside>
        </div>
    )
}

export default Reserva