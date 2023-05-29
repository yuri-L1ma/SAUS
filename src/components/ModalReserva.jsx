import css from "./ModalReserva.css"
import seta from "../assets/icons/setaBack.svg"

const ModalReserva = ({isOpen, onClose }) => {

    if (!isOpen)
        return null

    return (
        <div className="modal">
            <div className="modal_content">
                <div className="modal_header">
                    <div>
                        <button className="close" onClick={onClose}>
                            <span><img src={seta} alt="" /></span>
                        </button>
                        <h1>Reservar sala</h1>
                    </div>
                    <h3>Sala 1, Bloco 1</h3>
                </div>
                <section>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Nome completo</label>
                            <input className="textfield" placeholder="Nome Completo" type="email" name="" id="" />
                        </div>
                        <div className="input_group">
                            <label for="Remember">Matrícula</label>
                            <input className="textfield" placeholder="Senha" type="password" name="" id="" />
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
                        <div className="row">
                            <div className="input_group">
                                <label for="Remember">Atividade</label>
                                <select name="" id="">
                                    <option value="">Hoje</option>
                                    <option value="">Amanha</option>
                                    <option value="">26/12</option>
                                    <option value="">26/12</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label for="Remember">Nº de pessoas</label>
                                <input className="textfield" placeholder="Nº" type="number" name="" id="" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="Remember">Justificativa</label>
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button style={{backgroundColor:"#6FB98F"}}>Reservar</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default ModalReserva;