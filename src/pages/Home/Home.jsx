import Sala from "../../components/Sala/Sala";
import "./Home.css";

const Home = () => {

    const salas = [
        { nome: "SALA 1", bloco: "3", disponivel: true, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 2", bloco: "3", disponivel: false, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 3", bloco: "3", disponivel: true, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 4", bloco: "3", disponivel: false, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 5", bloco: "3", disponivel: true, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 6", bloco: "3", disponivel: true, equipamentos: ["projetor", "lousa", "cadeiras"] },
        { nome: "SALA 7", bloco: "3", disponivel: false, equipamentos: ["projetor", "lousa", "cadeiras"] }
    ]
    

    const toogleButtonColor = (event) => {
        const tag = event.target
        const buttons = document.querySelectorAll(".blocos button")

        if (!tag.classList.contains("ativo")) {
            for (let button of buttons) {
                if (button !== tag) {
                    button.classList.remove("ativo")
                }
            }

            tag.classList.toggle("ativo")
        }
    }

    return (
        <>
            <section className="filters d-flex flex-column gap-4">
                <div className="d-flex gap-4">
                    <div className="flex-grou">
                        <select name="" id="">
                            <option value="">Hoje</option>
                            <option value="">Amanha</option>
                            <option value="">26/12</option>
                            <option value="">26/12</option>
                        </select>
                    </div>
                    <div className="flex-grow-1">
                        <select className="w-100" name="" id="">
                            <option value="">AB / Manhã</option>
                            <option value="">CD / Manhã</option>
                            <option value="">Almoço</option>
                            <option value="">AB / Tarde</option>
                            <option value="">CD / Tarde</option>
                        </select>
                    </div>
                </div>
                <div className="blocos d-flex gap-4">
                    <button onClick={toogleButtonColor} className="ativo">B1</button>
                    <button onClick={toogleButtonColor}>B2</button>
                    <button onClick={toogleButtonColor}>B3</button>
                    <button onClick={toogleButtonColor}>B4</button>
                </div>
            </section>
            <section className="salas mt-4">
                <h5 className="mb-3 ms-1">Salas</h5>
                <div className="d-flex flex-column gap-4">
                    {
                        salas.map((sala) => {
                            return <Sala  nome={sala.nome} bloco={sala.bloco} disponivel={sala.disponivel} equipamentos={sala.equipamentos} />
                        })
                    }
                </div>
            </section>
        </>
    )
}

export default Home