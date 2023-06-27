import Sala from "../../components/Sala/Sala";
import Menu from "../../components/Menu/Menu";
import "./Home.css";
import { PlusCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../../components/Modal/Modal";
import moment from "moment/moment";
import axios from "axios";

const Home = () => {
    const [salas, setSalas] = useState([])
    const [blocos, setBlocos] = useState([])
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

    useEffect(() => {
        initComponents()
        handleDate()
    }, [])

    const handleCreateSala = (event) => {
        event.preventDefault()

        const nome = document.querySelector("#name").value
        const bloco = document.querySelector("#bloco.ativo").getAttribute("data-bloco-id")
        const capacidade = Number(document.querySelector("#capacity").value)
        const checked_materiais = document.querySelectorAll("input[type=checkbox]")

        let materiais = []

        for (let material of checked_materiais) {
            materiais.push({ nome: material.value, status: material.checked })
        }


        axios.post("http://localhost:3002/salas/criar", { nome, bloco, capacidade, reservas: [], materiais}).then((response) => {
            closeModalCreateSala()
            initComponents()
        }).catch((error) => {
            console.log(error)
        })
    }

    const initComponents = async () => {
        try {
            let blocos = await axios.get("http://localhost:3002/blocos/listar")
            let salas = await axios.get(`http://localhost:3002/salas/listar/${blocos.data[0]._id}`)
            setBlocos(blocos.data)
            setSalas(salas.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getSalasByBloco = () => {
        let buttonAtivo = document.querySelector(".blocos button.ativo")
        axios.get(`http://localhost:3002/salas/listar/${buttonAtivo.getAttribute('data-bloco-id')}`).then((response) => {
            setSalas(response.data)
        }).catch((error) => { console.log(error) })
    }

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
                    <form onSubmit={handleCreateSala}>
                        <div className="d-flex flex-column w-100 flex-md-row justify-content-between gap-4 ">
                            <div className="input_group">
                                <label for=" name">Nome da sala</label>
                                <input className="textfield" type="text" name="name" id="name" />
                            </div>
                            <div className="input_group w-auto">
                                <label for=" name">Bloco</label>
                                <div className="blocos d-flex gap-3">
                                    {blocos.map((bloco, index) => {
                                        if (index === 0) {
                                            return (
                                                <button type="submit" onClick={toogleButtonColor} className="ativo" id="bloco" data-bloco-id={bloco._id}>B{bloco.numero}</button>
                                            )
                                        }

                                        return (
                                            <button type="submit" onClick={toogleButtonColor} id="bloco" data-bloco-id={bloco._id}>B{bloco.numero}</button>
                                        )

                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="input_group">
                            <label for=" name">Capacidade</label>
                            <input className="textfield" type="number" name="capacity" id="capacity" />
                        </div>
                        <div className="input_group">
                            <label>Materiais disponíveis</label>
                            <div className="d-flex flex-column flex-md-row gap-2 border">
                                <div>
                                    <input type="checkbox" id="projetor" name="projetor" value="Projetor" />
                                    <label for="projetor " className="text-capitalize">Projetor</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="cabo_vga" name="cabo_vga" value="Cabo VGA" />
                                    <label for="cabo_vga" className="text-capitalize">Cabo VGA</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="cabo_hdmi" name="cabo_hdmi" value="Cabo HDMI" />
                                    <label for="cabo_hdmi" className="text-capitalize">Cabo HDMI</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="ar_condicionado" name="ar_condicionado" value="Ar-Condicionado" />
                                    <label for="ar_condicionado" className="text-capitalize">Ar-Condicionado</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="green">Criar sala</button>
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
        getSalasByBloco()

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
                            {blocos.map((bloco, index) => {
                                if (index === 0) {
                                    return (
                                        <button type="submit" onClick={toogleButtonColor} className="ativo" data-bloco-id={bloco._id}>B{bloco.numero}</button>
                                    )
                                }

                                return (
                                    <button type="submit" onClick={toogleButtonColor} data-bloco-id={bloco._id}>B{bloco.numero}</button>
                                )

                            })}

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
                                    <Sala sala={sala} date={searchDateItems.date} period={searchDateItems.period} />
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