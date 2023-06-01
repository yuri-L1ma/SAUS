import { useRef } from "react"
import "./Queixa.css"

const Queixa = ({ motivo, data }) => {
    const queixaRef = useRef(null)

    const toggleActiveReserve = (event) => {
        event.preventDefault()
        queixaRef.current.classList.toggle("ativo")
    }

    return (
        <div className="queixa" ref={queixaRef}>
            <header onClick={toggleActiveReserve}>
                <h1>{motivo}</h1>
                <h1>{data}</h1>
            </header>
            <aside>
                <section>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Descrição da Queixa</label>
                            <textarea name="" readOnly value={"Se danaram meninos teimosos eu escarro mesmo"} id="" cols="30" rows="3"></textarea>
                        </div>
                        <button  onClick={toggleActiveReserve} style={{ backgroundColor: "#2376D7" }}>X</button>
                    </form>
                </section>
            </aside>
        </div>
    )
}

export default Queixa