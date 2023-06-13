import "./Sala.css"
import { useState } from "react";
import ModalQueixa from "../ModalQueixa/ModalQueixa";
import ModalFeedback from "../ModalFeedback/ModalFeedback";
import projetor_icon from "../../assets/icons/projetor.svg"
import ar_icon from "../../assets/icons/ar.svg"
import { Edit2Icon } from "lucide-react";
import { useContext } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../Modal/Modal";
import moment from "moment/moment";

const Sala = ({ disponivel, bloco, nome, equipamentos }) => {
    const [modalQueixa, setModalQueixa] = useState(false);
    const [modalReserva, setModalReserva] = useState(false);
    const [modalFeedback, setModalFeedback] = useState(false);
    const { admin } = useContext(ContextoGambiarra)

    const toggleActiveClassroom = (sala_componente) => {
        sala_componente.parentElement.classList.toggle("ativo")
    }

    const openModalQueixa = () => {
        setModalQueixa(true);
    };

    const openModalReserva = () => {
        setModalReserva(true);
    };

    const closeModalQueixa = () => {
        setModalQueixa(false);
    };

    const closeModalReserva = () => {
        setModalReserva(false);
    };

    const openModalFeedback = () => {
        setModalFeedback(true);
    };

    const closeModalFeeedback = () => {
        setModalFeedback(false);
    };

    const configureFormsReserva = () => {
        if (disponivel) {
            if (admin) {
                return (
                    <form action="">
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" type="text" name="registration" id="registration" />
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="period">Período</label>
                                <select name="period" id="period">
                                    <option value="AB1">AB | MANHÃ</option>
                                    <option value="CD1">CD | MANHÃ</option>
                                    <option value="AB2">AB | TARDE</option>
                                    <option value="CD2">CD | TARDE</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label for="init_date">Data inicial</label>
                                <input className="textfield" type="date" name="init_date" value={moment().format("YYYY-MM-DD")} readOnly id="init_date" />
                            </div>
                            <div className="input_group">
                                <label for="end_date">Data final</label>
                                <input className="textfield" type="date" name="end_date" id="end_date" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <select className="w-100" name="activity" id="activity">
                                    <option value="Estudar com amigos">Estudar com amigos</option>
                                    <option value="Descansar">Descansar depois de um dia chato</option>
                                    <option value="Sei lá mano">Sei lá mano</option>
                                    <option value="Fofocar">Fofocar</option>
                                </select>
                            </div>
                            <div className="input_group align-items-end">
                                <label for="people">Nº de pessoas</label>
                                <input className="textfield w-50" placeholder="Nº" type="number" name="people" id="people" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" cols="30" rows="10"></textarea>
                        </div>
                        <button className="green">Reservar</button>
                    </form>
                )
            } else {
                return (
                    <form action="">
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" type="text" name="registration" id="registration" />
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="period">Período</label>
                                <select name="period" id="period">
                                    <option value="AB1">AB | MANHÃ</option>
                                    <option value="CD1">CD | MANHÃ</option>
                                    <option value="AB2">AB | TARDE</option>
                                    <option value="CD2">CD | TARDE</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label for="init_date">Hoje</label>
                                <input className="textfield" type="date" name="init_date" value={moment().format("YYYY-MM-DD")} readOnly id="init_date" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <select className="w-100" name="activity" id="activity">
                                    <option value="Estudar com amigos">Estudar com amigos</option>
                                    <option value="Descansar">Descansar depois de um dia chato</option>
                                    <option value="Sei lá mano">Sei lá mano</option>
                                    <option value="Fofocar">Fofocar</option>
                                </select>
                            </div>
                            <div className="input_group align-items-end">
                                <label for="people">Nº de pessoas</label>
                                <input className="textfield w-75" placeholder="Nº" type="number" name="people" id="people" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" cols="30" rows="10"></textarea>
                        </div>
                        <button className="green">Reservar</button>
                    </form>
                )
            }
        } else {
            if (admin) {
                return (
                    <form action="">
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" value={"Yuri Silva de Lima"} readOnly type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" value={"512314"} readOnly type="text" name="registration" id="registration" />
                            </div>
                        </div>
                        <div className="d-flex w-100 gap-3">
                            <div className="input_group">
                                <label for="period">Período</label>
                                <select name="period" disabled="true" id="period">
                                    <option value="AB1" selected>AB | MANHÃ</option>
                                    <option value="CD1">CD | MANHÃ</option>
                                    <option value="AB2">AB | TARDE</option>
                                    <option value="CD2">CD | TARDE</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label for="init_date">Data inicial</label>
                                <input className="textfield" type="date" name="init_date" value={moment().format("YYYY-MM-DD")} readOnly id="init_date" />
                            </div>
                            <div className="input_group">
                                <label for="end_date">Data final</label>
                                <input className="textfield" type="date" name="end_date" value={"2023-06-13"} readOnly id="end_date" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <select name="activity" id="activity" disabled="true">
                                    <option value="Estudar com amigos">Estudar com amigos</option>
                                    <option value="Descansar" selected>Descansar depois de um dia chato</option>
                                    <option value="Sei lá mano">Sei lá mano</option>
                                    <option value="Fofocar">Fofocar</option>
                                </select>
                            </div>
                            <div className="input_group align-items-end">
                                <label for="people">Nº de pessoas</label>
                                <input className="textfield w-50" placeholder="Nº" type="number" name="people" id="people" value={2} readOnly />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" value={"Cansei vetes"} cols="30" rows="10" readOnly></textarea>
                        </div>
                        <button className="red w-auto">Desabilitar reserva</button>
                    </form>
                )
            }
        }
    }

    const configureModalReserva = () => {
        return (
            <ModalBody isOpen={modalReserva}>
                <ModalHeader title={admin ? !disponivel ? "Ver reserva" : "Fazer reserva" : "Fazer reserva"} subtitle={`${nome}, BLOCO ${bloco}`} onClose={closeModalReserva} />
                <ModalSection>
                    {configureFormsReserva()}
                </ModalSection>
            </ModalBody>
        )
    }

    const configureModalFeedback = () => {
        return (
            <ModalBody isOpen={modalFeedback}>
                <ModalHeader title="Adicionar Feedback" subtitle={`${nome}, BLOCO ${bloco}`} onClose={closeModalFeeedback} />
                <ModalSection>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Material com defeito</label>
                            <input className="textfield" placeholder="Diga o material que tá com defeito" type="email" name="" id="" />
                        </div>
                        <div className="input_group">
                            <label for="Remember">Descrição do defeito</label>
                            <textarea name="" placeholder="Descreva o problema citado" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button>Adicionar</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }

    const configureModalQueixa = () => {
        <ModalBody isOpen={modalQueixa}>
            <ModalHeader title="Fazer Queixa" subtitle={`${nome}, BLOCO ${bloco}`} onClose={closeModalQueixa} />
            <ModalSection>
                <form action="">
                    <div className="input_group">
                        <label for="Remember">Material com defeito</label>
                        <input className="textfield" placeholder="Diga o material que tá com defeito" type="email" name="" id="" />
                    </div>
                    <div className="input_group">
                        <label for="Remember">Descrição do defeito</label>
                        <textarea name="" placeholder="Descreva o problema citado" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button>Adicionar</button>
                </form>
            </ModalSection>
        </ModalBody>
    }


    const qualModal = () => {
        if (disponivel) {
            return configureModalReserva()
        } else {
            if (admin) {
                return configureModalReserva()
            }
            return <ModalQueixa isOpen={modalQueixa} onClose={closeModalQueixa} />
        }
    }

    return (
        <>
            <div className="sala">
                <header onClick={(event) => toggleActiveClassroom(event.target)}>
                    <div className="d-flex gap-3 align-items-center">
                        <h1>{nome}</h1>
                        {admin ?
                            <button className="rounded-button">
                                <Edit2Icon size={16} />
                            </button>
                            : null}
                    </div>
                    <div className="icons">
                        <span>
                            <img src={projetor_icon} alt="" />
                        </span>
                        <span>
                            <img src={ar_icon} alt="" />
                        </span>
                    </div>
                    <h1 className={disponivel ? "disponivel" : "indisponivel"}>{disponivel ? "disponivel" : "reservado"}</h1>
                    {disponivel ?
                        <button className="green" onClick={openModalReserva}>Fazer Reserva</button>
                        : admin ?
                            <button className="red" onClick={openModalReserva}>Ver reserva</button>
                            :
                            <button className="red" onClick={openModalQueixa}>Fazer Queixa</button>
                    }
                </header>
                <aside>
                    <section>
                        <div>
                            <span>Materiais da sala</span>
                            <ul className="m-0 p-0">
                                {
                                    equipamentos.map((equipamento) => {
                                        return <li className="text-capitalize">{equipamento}</li>
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <span>Capacidade</span>
                            <p>45 pessoas</p>
                        </div>
                    </section>
                    <div className="d-flex w-100 gap-2 justify-content-end">
                        {!admin ?
                            <button className="outlined" onClick={openModalFeedback}>Dar feedback</button>
                            : null
                        }
                        {disponivel ?
                            <button className="green d-md-none" onClick={openModalReserva}>Fazer Reserva</button>
                            : admin ?
                                <button className="red d-md-none" onClick={openModalReserva}>Ver reserva</button>
                                :
                                <button className="red d-md-none" onClick={openModalQueixa}>Fazer Queixa</button>
                        }
                    </div>
                </aside>
            </div>
            {configureModalFeedback()}
            {qualModal()}
        </>
    )
}

export default Sala