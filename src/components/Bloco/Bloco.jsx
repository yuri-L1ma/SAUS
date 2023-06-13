import { Maximize2Icon } from "lucide-react"
import "./Bloco.css"

const Bloco = ({ nome, qtdSalas }) => {
    return (
        <div className="bloco">
            <header className="gap-3">
                <div className="d-flex gap-md-5 gap-2 flex-wrap w-100">
                    <h1 className="text-nowrap">{nome}</h1>
                    <h1>{qtdSalas} salas</h1>
                </div>
                <button className="d-flex align-items-center gap-3 justify-content-center">
                    <Maximize2Icon size={24} />
                    <span className="text-nowrap d-none d-md-block">Ver mais</span>
                </button>
            </header>
        </div>
    )
}

export default Bloco