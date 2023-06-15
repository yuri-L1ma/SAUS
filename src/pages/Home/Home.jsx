import Sala from "../../components/Sala/Sala";
import Menu from "../../components/Menu/Menu";
import "./Home.css";
import { PlusCircle } from "lucide-react";
import { useContext, useState } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../../components/Modal/Modal";

const Home = () => {
    const [modalCreateSala, setModalCreateSala] = useState(false)
    const { admin } = useContext(ContextoGambiarra)

    const openModalCreateSala = () => {
        setModalCreateSala(true)
    }

    const closeModalCreateSala = () => {
        setModalCreateSala(false)
    }

    const salas = [
        { nome: "SALA 1", bloco: "3", disponivel: true, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: false}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 2", bloco: "3", disponivel: false, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 3", bloco: "3", disponivel: true, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 4", bloco: "3", disponivel: false, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 5", bloco: "3", disponivel: true, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 6", bloco: "3", disponivel: true, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] },
        { nome: "SALA 7", bloco: "3", disponivel: false, equipamentos: [{nome:"cabo vga", existe: true}, {nome:"cabo hdmi", existe: true}, {nome: "ar-condicionado", existe:true}, {nome:"projetor", existe: true}] }
    ]

    const toogleButtonColor = (event) => {
        event.preventDefault()
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


    const configureModalCreateSala = () => {
        return (
            <ModalBody isOpen={modalCreateSala}>
                <ModalHeader title={"Adicionar sala"} onClose={closeModalCreateSala} />
                <ModalSection>
                    <form action="">
                        <div className="d-flex flex-column w-100 flex-md-row justify-content-between gap-4 ">
                            <div className="input_group">
                                <label for=" name">Nome da sala</label>
                                <input className="textfield" type="text" name="name" id="name" />
                            </div>
                            <div className="input_group w-auto">
                                <label for=" name">Bloco</label>
                                <div className="blocos d-flex gap-3">
                                    <button onClick={toogleButtonColor} className="ativo">B1</button>
                                    <button onClick={toogleButtonColor}>B2</button>
                                    <button onClick={toogleButtonColor}>B3</button>
                                    <button onClick={toogleButtonColor}>B4</button>
                                </div>
                            </div>
                        </div>
                        <div className="input_group">
                            <label>Materiais disponíveis</label>
                            <div className="d-flex flex-column flex-md-row gap-2 border">
                                {salas[0].equipamentos.map((equipamento) => {
                                    return (
                                        <div>
                                            <input type="checkbox" id={equipamento.nome} name={equipamento.nome} />
                                            <label for={equipamento.nome} className="text-capitalize">{equipamento.nome}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button className="green">Criar sala</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }

    return (
        <>
            <Menu />
            <main>
                <h5 className="mb-3 ms-1">Filtros</h5>
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
                    <div className="d-flex w-100 align-items-center justify-content-between mb-3 ms-1">
                        <h5>Salas</h5>
                        {admin ?
                            <button className="d-flex gap-3 outlined w-auto" onClick={openModalCreateSala}>
                                <PlusCircle size={24} />
                                <span>Adicionar sala</span>
                            </button>
                            : null
                        }
                    </div>
                    <div className="d-flex flex-column gap-4">
                        {
                            salas.map((sala) => {
                                return <Sala nome={sala.nome} bloco={sala.bloco} disponivel={sala.disponivel} equipamentos={sala.equipamentos} />
                            })
                        }
                    </div>
                    {configureModalCreateSala()}
                </section>
            </main>
        </>
    )
}

export default Home