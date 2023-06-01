import "./ModalFeedback.css"
import seta from "../../assets/icons/setaBack.svg"

const ModalFeedback = ({ isOpen, onClose }) => {

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
                        <h1>Dar feedback</h1>
                    </div>
                    <h3>Sala 1, Bloco 1</h3>
                </div>
                <section>
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
                </section>
            </div>
        </div>
    );
}

export default ModalFeedback