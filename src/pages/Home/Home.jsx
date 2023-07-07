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
    const [turnos, setTurnos] = useState([])
    const [reservavel, setReservavel] = useState(true)
    const [modalCreateSala, setModalCreateSala] = useState(false)
    const { admin } = useContext(ContextoGambiarra)
    const [searchDateItems, setSearchDateItems] = useState({ turno: { init_value: 0, name: '', id: '' }, date: '', bloco: '' })
    const [optionsSelect, setOptionsSelect] = useState([])

    useEffect(() => {
        initComponents()
    }, [])

    useEffect(() => {
        getSalas()

        if (moment(searchDateItems.date).day() === 6 || moment(searchDateItems.date).day() === 0) {
            // setOptionsSelect([<option value={0}>Indisponível para reservas</option>])
            setReservavel(false)
        }
    }, [searchDateItems])

    useEffect(() => {
        const turnoForm = document.querySelector(".turno");

        if (turnoForm && turnoForm.selectedOptions.length > 0) {
            let turnoFormValue = turnoForm.selectedOptions[0].value
            let turnoFormName = turnoForm.selectedOptions[0].text
            let turnoFormID = turnoForm.selectedOptions[0].getAttribute("data-turno-id")

            setSearchDateItems({ ...searchDateItems, turno: { init_value: turnoFormValue, name: turnoFormName, id: turnoFormID } })

            if (turnoFormValue == 0) {
                setReservavel(false)
            }else{
                setReservavel(true)
            }
        }
    }, [optionsSelect]);

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

        axios.post("http://localhost:3002/salas/criar", { nome, bloco, capacidade, reservas: [], materiais }).then((response) => {
            closeModalCreateSala()
            initComponents()
        }).catch((error) => {
            console.log(error)
        })
    }

    const initComponents = async () => {
        try {
            let blocosDB = await axios.get("http://localhost:3002/blocos/listar")
            let turnosDB = await axios.get("http://localhost:3002/turnos/listar")
            let salasDB = await axios.get(`http://localhost:3002/salas/listar/${blocosDB.data[0]._id}/${moment().format('YYYY-MM-DD')}/${moment().format("HH:mm").replace(":", "")}`)
            let turnosQuantity = turnosDB.data.length

            turnosDB.data.sort((a, b) => a.comeco - b.comeco)

            setBlocos(blocosDB.data)
            setTurnos(turnosDB.data)
            setSalas(salasDB.data)

            //Pegando turnos do Banco e colocando no select com base na hora do sistema
            setOptionsSelect(
                turnosDB.data.map((turno, index) => {
                    let hora = parseInt(moment().format("HH:mm").replace(":", ""))
                    if (turno.fim >= hora) {
                        return <option value={turno.comeco} data-turno-id={turno._id}>{turno.nome}</option>
                    } else if (index === (turnosQuantity - 1)) {
                        if (hora > turno.fim) {
                            return <option value={0}>Indisponível para reservas nesse horário</option>
                        }
                    }
                }))

        } catch (error) {
            console.log(error)
        }
    }

    const getSalas = async () => {
        try {
            let salasDB = await axios.get(`http://localhost:3002/salas/listar/${searchDateItems.bloco}/${searchDateItems.date}/${searchDateItems.turno.init_value}`)
            setSalas(salasDB.data)
        } catch (error) {
            console.log(error)
        }
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
        let dataAtual = moment().format("YYYY-MM-DD")
        let dataSelecionada = document.querySelector("#data_pesquisada").value
        let dayOfWeek = moment(dataSelecionada).day()
        let horaAtual = parseInt(moment().format("HH:mm").replace(":", ""))


        if (dataAtual !== dataSelecionada) {
            setOptionsSelect(turnos.map((turno, index) => {
                if (index === 0) {
                    return <option value={turno.comeco} data-turno-id={turno._id} selected>{turno.nome}</option>
                } else {
                    return <option value={turno.comeco} data-turno-id={turno._id}>{turno.nome}</option>
                }
            }))
        } else {
            setOptionsSelect(turnos.map((turno, index) => {
                if (turno.fim >= horaAtual) {
                    if (index === 0) {
                        return <option value={turno.comeco} data-turno-id={turno._id} selected>{turno.nome}</option>
                    } else {
                        return <option value={turno.comeco} data-turno-id={turno._id}>{turno.nome}</option>
                    }
                } else if (index === (turnos.length - 1)) {
                    if (horaAtual > turno.fim) {
                        return <option value={0}>Indisponível para reservas nesse horário</option>
                    }
                }
            }))
        }
        
        if(dayOfWeek === 6 || dayOfWeek === 0){
            setOptionsSelect([<option value={0}>Indisponível para reservas aos fins de semana</option>])
        }
    }

    const updateItems = () => {
        let dateForm = document.querySelector("#data_pesquisada").value
        let blocoForm = document.querySelector(".blocos .ativo").getAttribute('data-bloco-id')
        let turnoFormValue = document.querySelector(".turno").selectedOptions[0].value
        let turnoFormName = document.querySelector(".turno").selectedOptions[0].text
        let turnoFormID = document.querySelector(".turno").selectedOptions[0].getAttribute("data-turno-id")

        setSearchDateItems({ date: dateForm, bloco: blocoForm, turno: { init_value: turnoFormValue, name: turnoFormName, id: turnoFormID } })
    }

    const handleSearchClassrooms = (event) => {
        event.preventDefault()

        handleDate()

        updateItems()
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
                                <select className="turno w-100" name="turno" id="turno">
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
                                    <Sala sala={sala} date={{ day: document.querySelector("#data_pesquisada").value, turno: { name: searchDateItems.turno.name, init_value: searchDateItems.turno.init_value, id: searchDateItems.turno.id } }} reservavel={reservavel} updateSalas = {initComponents} />
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