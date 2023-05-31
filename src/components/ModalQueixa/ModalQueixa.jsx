import "./ModalQueixa.css"
import seta from "../../assets/icons/setaBack.svg"

const ModalQueixa = ({ isOpen, onClose }) => {

    if (!isOpen)
        return null

    return (
        <div className="modalyuri">
            <div className="modal_content">
                <div className="modal_header">
                    <div>
                        <button className="close" onClick={onClose}>
                            <span><img src={seta} alt="" /></span>
                        </button>
                        <h1>Fazer Queixa</h1>
                    </div>
                    <h3>Sala 1, Bloco 1</h3>
                </div>
                <section>
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