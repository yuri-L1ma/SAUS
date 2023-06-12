import "./Modal.css"
import seta from "../../assets/icons/setaBack.svg"

const Modal = ({ isOpen, children }) => {

    if (!isOpen)
        return null

    return (
        <div className="modal_body">
            <div className="modal_content">
                {children}
            </div>
        </div>
    );
}

export default Modal