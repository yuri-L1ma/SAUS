import "./ModalReserva.css"
import { ArrowLeft } from "lucide-react";

const ModalReserva = ({ isOpen, onClose }) => {

    if (!isOpen)
        return (
            null
        )

    return (
        <div className="modal_body">
            <div className="modal_content">
                <div className="modal_header">
                    <div className="modal_title d-flex align-items-center">
                        <button className="close" onClick={onClose}>
                            <ArrowLeft size={24} />
                        </button>
                        <span>Reservar sala</span>
                    </div>
                    <h3>Sala 1, Bloco 1</h3>
                </div>
                <section className="modal_section">
                    <form action="">
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="Remember">Nome completo</label>
                                <input className="textfield" placeholder="Nome Completo" type="email" name="" id="" />
                            </div>
                            <div className="input_group">
                                <label for="Remember">Matrícula</label>
                                <input className="textfield" placeholder="Senha" type="password" name="" id="" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="Remember">Período</label>
                            <select name="" id="">
                                <option value="">Hoje</option>
                                <option value="">Amanha</option>
                                <option value="">26/12</option>
                                <option value="">26/12</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between w-100">
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
                                <label for="Remember">Nº de pessoas</label>
                                <input className="textfield w-50" placeholder="Nº" type="number" name="" id="" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="Remember">Justificativa</label>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button className="green">Reservar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ModalReserva;