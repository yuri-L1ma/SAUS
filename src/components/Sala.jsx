import css from "./Sala.css"
import { useState } from "react";
import ModalReserva from "./ModalReserva";
import ModalQueixa from "./ModalQueixa";

const Sala = ({disponivel}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const toggleActiveClassroom = (sala) => {
        sala.parentElement.classList.toggle("ativo")
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const qualModal = () => {
        if(disponivel){
            return <ModalReserva isOpen={modalOpen} onClose={closeModal}/>
        }else{
            return <ModalQueixa isOpen={modalOpen} onClose={closeModal}/>
        }
    }

    return (
        <>
            <div className="sala">
                <header onClick={(event) => toggleActiveClassroom(event.target)}>
                    <h1>Nome sala</h1>
                    <h1 className={disponivel?"disponivel":"indisponivel"}>{disponivel?"disponivel":"indisponivel"}</h1>
                </header>
                <aside>
                    <section>
                        <div>
                            <h3>Materiais da sala</h3>
                            <ul>
                                <li>Cabo VGA</li>
                                <li>Cabo VGA</li>
                                <li>Cabo VGA</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Capacidade</h3>
                            <p>45 pessoas</p>
                        </div>
                    </section>
                    {disponivel?<button onClick={openModal}>Fazer Reserva</button>:<button style={{backgroundColor: "#E55454"}}onClick={openModal}>Fazer Queixa</button>}
                </aside>
            </div>
            {qualModal()}
        </>
    )
}

export default Sala