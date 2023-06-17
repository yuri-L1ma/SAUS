import { useContext, useRef } from "react"
import "./Reserva.css"
import { XIcon, TrashIcon } from "lucide-react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"

const Reserva = ({ ativa }) => {
    const reservaRef = useRef(null)
    const { admin } = useContext(ContextoGambiarra)

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
                    <form action="" className="d-flex flex-column gap-3 w-100">
                        <div className="d-flex flex-column gap-3 gap-md-5 flex-md-row">
                            <div className="d-flex gap-md-3 flex-column w-100 justify-content-between">
                                <div className="d-flex flex-column flex-md-row justify-content-between w-100 gap-3">
                                    <div className="input_group">
                                        <label for="Remember">Nome completo</label>
                                        <input className="textfield" value={"YURI SILVA DE LIMA"} readOnly placeholder="Nome Completo" type="email" name="" id="" />
                                    </div>
                                    <div className="input_group align-items-md-end">
                                        <label for="Remember">Matrícula</label>
                                        <input className="textfield" placeholder="" value={"512414"} readOnly type="number" name="" id="" />
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-3 flex-md-row w-100">
                                    <div className="input_group">
                                        <label for="Remember">Período</label>
                                        <input className="textfield info-destaque" placeholder="" value={"AB - MANHÃ"} readOnly type="text" name="" id="" />
                                    </div>
                                    <div className="d-flex gap-3 flex-row justify-content-between">
                                        <div className="input_group">
                                            <label for="Remember">Atividade</label>
                                            <select name="" id="">
                                                <option value="">Hoje</option>
                                                <option value="">Amanha</option>
                                                <option value="">26/12</option>
                                                <option value="">26/12</option>
                                            </select>
                                        </div>
                                        <div className="input_group align-items-end">
                                            <label for="Remember" className="text-nowrap">Nº de pessoas</label>
                                            <input className="textfield" placeholder="Nº" type="number" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input_group justificativa flex-shrink-1 w-auto">
                                <label for="Remember">Justificativa</label>
                                <textarea name="" readOnly value={"Estudar é bom e é porque é"} id="" cols="10" rows="5"></textarea>
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