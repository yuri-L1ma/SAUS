import { TrashIcon } from "lucide-react"
import "./Bloco.css"
import axios from "axios"

const Bloco = ({ bloco }) => {
    const handleDeleteBloco = (event) => {
        event.preventDefault()
        alert(bloco._id)

        axios.delete(`http://localhost:3002/blocos/remover/${bloco._id}`)
            .then(() => {
                alert("Bloco excluído com sucesso!")
            }).catch((error) => {console.log(error)})
    }
    return (
        <div className="bloco">
            <header className="gap-3">
                <div className="d-flex gap-md-5 gap-2 flex-wrap w-100">
                    <h1 className="text-nowrap">BLOCO {bloco.numero}</h1>
                    <h1>{bloco.salas.length} salas</h1>
                </div>
                <button className="d-flex align-items-center gap-3 justify-content-center red w-auto" onClick={handleDeleteBloco}>
                    <TrashIcon size={20} />
                    <span className="text-nowrap d-none d-md-block">Excluir bloco</span>
                </button>
            </header>
        </div>
    )
}

export default Bloco