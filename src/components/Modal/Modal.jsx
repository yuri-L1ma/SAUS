import "./Modal.css"
import { ArrowLeft } from "lucide-react"

const ModalHeader = ({ title, subtitle, onClose }) => {
    return (
        <div className="modal_header">
            <div className="modal_title d-flex align-items-center">
                <button className="close" onClick={onClose}>
                    <ArrowLeft size={24} />
                </button>
                <span>{title}</span>
            </div>
            <h3>{subtitle}</h3>
        </div>
    )
}

const ModalSection = ({ children }) => {
    return (
        <section className="modal_section">
            {children}
        </section>
    )
}

const ModalBody = ({ isOpen, children }) => {

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

export {ModalBody, ModalHeader, ModalSection}