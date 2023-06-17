import Sala from "../../components/Sala/Sala";
import Menu from "../../components/Menu/Menu";
import "./Home.css";
import { PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../../components/Modal/Modal";
import moment from "moment/moment";

const Home = () => {
    const [salas, setSalas] = useState(
        [
            { nome: "SALA 1", bloco: "3", disponivel: true, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: false }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 2", bloco: "3", disponivel: false, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 3", bloco: "3", disponivel: true, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 4", bloco: "3", disponivel: false, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 5", bloco: "3", disponivel: true, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 6", bloco: "3", disponivel: true, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] },
            { nome: "SALA 7", bloco: "3", disponivel: false, equipamentos: [{ nome: "cabo vga", existe: true }, { nome: "cabo hdmi", existe: true }, { nome: "ar-condicionado", existe: true }, { nome: "projetor", existe: true }] }
        ]
    )
    const [modalCreateSala, setModalCreateSala] = useState(false)
    const { admin } = useContext(ContextoGambiarra)
    const [searchDateItems, setSearchDateItems] = useState(
        {
            period:
                { name: '', value: '' },
            bloco: '', 
            date: ''
        }
    )
    const [optionsSelect, setOptionsSelect] = useState([
        <option value={800}>AB / Manhã</option>,
        <option value={1000}>CD / Manhã</option>,
        <option value={1200}>Almoço</option>,
        <option value={1330}>AB / Tarde</option>,
        <option value={1530}>CD / Tarde</option>,
    ])

    useEffect(() => { handleDate() }, [])

    const openModalCreateSala = () => {
        setModalCreateSala(true)
    }

    const closeModalCreateSala = () => {
        setModalCreateSala(false)
    }

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

        handleSearchClassrooms(event)
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

    const handleDate = () => {
        const selectedDate = document.querySelector("#data_pesquisada")
        const exactHour = parseInt(moment().format("HH:mm").replace(":", ""))
        // const exactHour = 2300
        const periods = [
            { start: 800, end: 959 },
            { start: 1000, end: 1159 },
            { start: 1200, end: 1329 },
            { start: 1330, end: 1529 },
            { start: 1530, end: 1730 }
        ]
        let newOptionsSelect = []

        if (selectedDate.value !== moment().format("YYYY-MM-DD")) {
            newOptionsSelect = [
                <option value={800}>AB / Manhã</option>,
                <option value={1000}>CD / Manhã</option>,
                <option value={1200}>Almoço</option>,
                <option value={1330}>AB / Tarde</option>,
                <option value={1530}>CD / Tarde</option>
            ]
        } else {
            newOptionsSelect = optionsSelect.filter((option) => {
                for (let period of periods) {
                    if (exactHour >= period.start) {
                        if (exactHour <= period.end && option.props.value >= period.start) {
                            return option
                        }
                    }
                }
                return null
            })
        }

        if (newOptionsSelect.length === 0) {
            newOptionsSelect = [
                <option value={0}>Indisponível para reservas</option>
            ]
        }

        searchDateItems.period = { name: newOptionsSelect[0].props.children, value: newOptionsSelect[0].props.value }
        searchDateItems.date = moment(selectedDate.value).format("YYYY-MM-DD")

        setOptionsSelect(newOptionsSelect)
        setSearchDateItems(searchDateItems)
    }

    const handleSearchClassrooms = (event) => {
        event.preventDefault()

        handleDate()

        const data_pesquisada = document.querySelector("#data_pesquisada").value
        let period = document.querySelector(".period").selectedOptions[0]
        const bloco = document.querySelector(".blocos .ativo").textContent

        searchDateItems.date = data_pesquisada // talvez dê erro
        searchDateItems.period = { name: period.textContent, value: period.value }
        searchDateItems.date = moment(data_pesquisada).format("YYYY-MM-DD")
        searchDateItems.bloco = bloco

        setSearchDateItems(searchDateItems)


        // alert(`Data pesquisada: ${data_pesquisada} \n Período: ${period.value}\n Bloco: ${bloco}`)
    }

    return (
        <>
            <Menu />
            <main>
                <h5 className="mb-3 ms-1">Filtros</h5>
                <section className="filters d-flex flex-column gap-4">
                    <form className="w-100 d-flex justify-content-start" action="#" method="get" onChange={handleSearchClassrooms}>
                        <div className="blocos d-flex gap-4">
                            <button type="submit" onClick={toogleButtonColor} className="ativo">B1</button>
                            <button type="submit" onClick={toogleButtonColor}>B2</button>
                            <button type="submit" onClick={toogleButtonColor}>B3</button>
                            <button type="submit" onClick={toogleButtonColor}>B4</button>
                        </div>
                        <div className="d-flex gap-4">
                            <div className="flex-grou">
                                <input className="textfield" type="date" name="data_pesquisada" id="data_pesquisada" min={moment().format("YYYY-MM-DD")} defaultValue={moment().format("YYYY-MM-DD")} />
                            </div>
                            <div className="flex-grow-1">
                                <select className="period w-100" name="period" id="period">
                                    {optionsSelect}
                                </select>
                            </div>
                        </div>
                    </form>
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
                                return (
                                    <Sala nome={sala.nome} bloco={sala.bloco} disponivel={sala.disponivel} equipamentos={sala.equipamentos} date={searchDateItems.date} period={searchDateItems.period} />
                                )
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