import Menu from "../../components/Menu/Menu"
import Bloco from "../../components/Bloco/Bloco"
import "./Blocos.css"

const Blocos = () => {
    const blocos = [
        { nome: "BLOCO 1", qtdSalas: "12", },
        { nome: "BLOCO 2", qtdSalas: "12", },
        { nome: "BLOCO 3", qtdSalas: "12", },
        { nome: "BLOCO 4", qtdSalas: "12", },
    ]

    return (
        <>
            <Menu />
            <main>
                <div className="mb-3 ms-1 d-flex align-items-md-center flex-column flex-md-row w-100 justify-content-between gap-3">
                    <h5 className="">Blocos</h5>
                </div>
                <section className="Blocos mt-4">
                    <div className="d-flex flex-column gap-4">
                        {
                            blocos.map((bloco) => {
                                return <Bloco nome={bloco.nome} qtdSalas={bloco.qtdSalas}/>
                            })
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Blocos