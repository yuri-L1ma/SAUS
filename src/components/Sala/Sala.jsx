import "./Sala.css"
import { useState } from "react";
import ModalReserva from "../ModalReserva/ModalReserva"
import ModalQueixa from "../ModalQueixa/ModalQueixa";
import ModalFeedback from "../ModalFeedback/ModalFeedback";
import projetor_icon from "../../assets/icons/projetor.svg"
import ar_icon from "../../assets/icons/ar.svg"
import { Edit2Icon } from "lucide-react";
import { useContext } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"

const Sala = ({ nome, bloco, disponivel, equipamentos }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalFeedbackOpen, setModalFeedbackOpen] = useState(false);
    const {admin} = useContext(ContextoGambiarra)
    

    const toggleActiveClassroom = (sala) => {
        sala.parentElement.classList.toggle("ativo")
    }

    // const configureModals = () => {
    //     if(user)
    // }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModalFeedback = () => {
        setModalFeedbackOpen(true);
    };

    const closeModalFeeedback = () => {
        setModalFeedbackOpen(false);
    };

    const qualModal = () => {
        if (disponivel) {
            return <ModalReserva isOpen={modalOpen} onClose={closeModal} />
        } else {
            return <ModalQueixa isOpen={modalOpen} onClose={closeModal} />
        }
    }

    return (
        <>
            <div className="sala">
                <header onClick={(event) => toggleActiveClassroom(event.target)}>
                    <div className="d-flex gap-3 align-items-center">
                        <h1>{nome}</h1>
                        {admin ?
                            <button className="rounded-button" onClick={openModal}>
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
                        <button className="green" onClick={openModal}>Fazer Reserva</button>
                        :
                        !admin ?
                        <button className="red" onClick={openModal}>Fazer Queixa</button>
                        :
                        <button className="red" onClick={openModal}>Ver reserva</button>
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
                            <button className="green d-md-none" onClick={openModal}>Fazer Reserva</button>
                            :
                            !admin ?
                            <button className="red d-md-none" onClick={openModal}>Fazer Queixa</button>
                            : null
                        }
                    </div>
                </aside>
            </div>
            <ModalFeedback isOpen={modalFeedbackOpen} onClose={closeModalFeeedback} />
            {qualModal()}
        </>
    )
}

export default Sala