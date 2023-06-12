// import "./ModalQueixa.css"
import seta from "../../assets/icons/setaBack.svg"

import { ArrowLeft } from "lucide-react";

const ModalQueixa = ({ isOpen, onClose }) => {

    if (!isOpen)
        return null

    return (
        <div className="modal_body">
            <div className="modal_content">
                <div className="modal_header">
                    <div className="modal_title d-flex align-items-center">
                        <button className="close" onClick={onClose}>
                            <ArrowLeft size={24} />
                        </button>
                        <span>Fazer Queixa</span>
                    </div>
                    <h3>Sala 1, Bloco 1</h3>
                </div>
                <section className="modal_section">
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Regra Violada</label>
                            <select name="" id="">
                                <option value="">REGRA A DEFINIR</option>
                                <option value="">REGRA A DEFINIR</option>
                                <option value="">REGRA A DEFINIR</option>
                                <option value="">REGRA A DEFINIR</option>
                            </select>
                        </div>
                        <div className="input_group">
                            <label for="Remember">Justificativa</label>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button>Queixar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ModalQueixa;