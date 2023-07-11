import "./Sala.css"
import { useState, useEffect } from "react";
import projetor_icon from "../../assets/icons/projetor.svg"
import ar_icon from "../../assets/icons/ar.svg"
import { Edit2Icon, PlusCircle, Trash } from "lucide-react";
import { useContext } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../Modal/Modal";
import moment from "moment/moment";
import 'moment/locale/pt'
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

moment.locale('pt')

const Sala = ({ sala, date, reservavel, updateSalas }) => {
    const [modalQueixa, setModalQueixa] = useState(false);
    const [modalReserva, setModalReserva] = useState(false);
    const [modalFeedback, setModalFeedback] = useState(false);
    const [modalEditSala, setModalEditSala] = useState(false);
    const [blocos, setBlocos] = useState([])
    const [turnos, setTurnos] = useState([])
    const [turnosSelect, setTurnosSelect] = useState([])
    const [turnosSelected, setTurnosSelected] = useState([])
    const [daysSelected, setDaysSelected] = useState([])
    const [materiais, setMateriais] = useState(sala.materiais)

    const { admin } = useContext(ContextoGambiarra)

    useEffect(() => {
        initComponents()
    }, [])

    useEffect(() => {
        if (daysSelected.length > 0) {
            console.log(daysSelected)
            hasReserva(daysSelected)
        }
    }, [daysSelected])

    useEffect(() => {
        if(daysSelected.length > 0) {
            setDaysSelected([])
            for (let day of daysSelected) {
                let diaAdicionado = { dia: day.dia, turnos: turnosSelected }
                setDaysSelected(prevDaysSelected => [...prevDaysSelected, diaAdicionado])
            }
        }
    }, [turnosSelected])


    const hasReserva = async (dias) => {
        try {
            let reserva = await axios.post(`http://localhost:3002/salas/hasReserva`, { dias, sala: sala._id })
            if (reserva) {
                let dias = reserva.data.dias
                let turnos = dias.map((dia) => dia.turnos)
                console.log(dias, turnos)
                // alert(`SALA INDISPONÍVEL \n`)
                setDaysSelected([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleTurnosSelected = (turno) => {
        setTurnosSelected((prevTurnosSelected) => {
            if (prevTurnosSelected.some((item) => item._id === turno._id)) {
                alert("Turno já adicionado")
            } else {
                return [...prevTurnosSelected, turno];
            }

            return prevTurnosSelected;
        });
    }

    const initComponents = async () => {
        try {
            let blocosDB = await axios.get("http://localhost:3002/blocos/listar")
            let turnosDB = await axios.get("http://localhost:3002/turnos/listar")
            let turnosQuantity = turnosDB.data.length

            turnosDB.data.sort((a, b) => a.comeco - b.comeco)

            setBlocos(blocosDB.data)
            setTurnos(turnosDB.data)
            setTurnosSelect([])

            turnosDB.data.forEach(
                (turno, index) => {
                    let hora = parseInt(moment().format("HH:mm").replace(":", ""))
                    if (turno.fim >= hora) {
                        setTurnosSelect((prevTurnosSelected) => [...prevTurnosSelected, turno])
                    } else if (index === (turnosQuantity - 1)) {
                        if (hora > turno.fim) {
                            setTurnosSelect([])
                        }
                    }
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    const handleDate = () => {
        let dataAtual = moment().format("YYYY-MM-DD")
        let dataSelecionada = document.querySelector("#init_date").value
        let horaAtual = parseInt(moment().format("HH:mm").replace(":", ""))


        if (dataAtual !== dataSelecionada) {
            setTurnosSelect(turnos.map((turno) => {
                return turno
            }))
        } else {
            setTurnosSelect(turnos.map((turno, index) => {
                if (turno.fim >= horaAtual) {
                    return turno
                } else if (index === (turnos.length - 1)) {
                    if (horaAtual > turno.fim) {
                        return null
                    }
                }
            }))
        }

    }

    const toggleActiveClassroom = (sala_componente) => {
        sala_componente.parentElement.classList.toggle("ativo")
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
    }

    const toogleMateriais = (event) => {
        const checksBoxs = document.querySelectorAll(".input_group input[type='checkbox']")
        const materiais = []

        for (let checkBox of checksBoxs) {
            materiais.push({ nome: checkBox.name, status: checkBox.checked })
        }

        setMateriais(materiais)
    }

    const openModalQueixa = () => {
        setModalQueixa(true);
    };

    const openModalReserva = () => {
        setModalReserva(true);
    };

    const closeModalQueixa = () => {
        setModalQueixa(false);
    };

    const closeModalReserva = () => {
        setModalReserva(false);
        setDaysSelected([])
    };

    const openModalFeedback = () => {
        setModalFeedback(true);
    };

    const closeModalFeeedback = () => {
        setModalFeedback(false);
    };

    const openModalEditSala = () => {
        setModalEditSala(true);
    };

    const closeModalEditSala = () => {
        setModalEditSala(false);
        setMateriais(sala.materiais)
    };

    const handleCreateReserva = (event) => {
        event.preventDefault()

        
        const init_date = document.querySelector("#init_date").value
        const end_date = document.querySelector("#end_date")
        const activity = document.querySelector("#activity").value
        const quantity_people = document.querySelector("#quantity_people").value
        const justification = document.querySelector("#justification").value
        const sala_id = sala._id

        // alert(`${turno} ${init_date} ${activity} ${quantity_people} ${justification}`)

        if(end_date){
            axios.post("http://localhost:3002/dias/criar", { dias: daysSelected }).then((dias) => {
                let idDias = dias.data.map((dia) => dia._id)
                axios.post("http://localhost:3002/reservas/criar", { atividade: activity, justificativa: justification, sala: sala_id, qtdAlunos: quantity_people, ativa: true, dias: idDias }).then((response) => {
                    closeModalReserva()
                    updateSalas()
                    // initComponents()
                }).catch((error) => {
                    console.log(error.response.data)
                })
            }).catch((error) => { alert(error) })
        }else{
            const turno = document.querySelector("#alunoturno").getAttribute("data-id-turno")
            axios.post("http://localhost:3002/dias/criar", { dias: {dia: init_date, turnos: [turno]} }).then((dias) => {
                let idDias = dias.data.map((dia) => dia._id)
                axios.post("http://localhost:3002/reservas/criar", { atividade: activity, justificativa: justification, sala: sala_id, qtdAlunos: quantity_people, ativa: true, dias: idDias }).then((response) => {
                    closeModalReserva()
                    updateSalas()
                    // initComponents()
                }).catch((error) => {
                    console.log(error.response.data)
                })
            }).catch((error) => { alert(error) })
        }

    }

    const handlePeriod = (event) => {
        event.preventDefault()

        handleDate()

        setDaysSelected([])


        const day = parseInt(document.querySelector("#day").value);

        const init_date = moment(document.querySelector("#init_date").value).startOf('day');
        const end_date = moment(document.querySelector("#end_date").value).startOf('day');

        if (end_date.isBefore(init_date)) {
            setDaysSelected([])
        }

        const date_calc = init_date;


        if (day === 7) {
            while (date_calc.isSameOrBefore(end_date)) {
                if (date_calc.day() !== 0 && date_calc.day() !== 6) {
                    let diaAdicionado = { dia: date_calc.format("YYYY-MM-DD"), turnos: turnosSelected }
                    setDaysSelected((prevDaysSelected) =>
                        [...prevDaysSelected, diaAdicionado]
                    )
                }
                date_calc.add(1, 'days');
            }
        } else {
            while (date_calc.isSameOrBefore(end_date)) {
                if (date_calc.day() === day) {
                    let diaAdicionado = { dia: date_calc.format("YYYY-MM-DD"), turnos: turnosSelected }
                    setDaysSelected((prevDaysSelected) =>
                        [...prevDaysSelected, diaAdicionado]
                    )
                }

                date_calc.add(1, 'days');
            }
        }
    }

    const configureFormsReserva = () => {
        if (sala.disponivel) {
            if (admin) {
                return (
                    <form onSubmit={handleCreateReserva}>
                        {/* <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" type="text" name="registration" id="registration" />
                            </div>
                        </div> */}
                        <div className="d-flex flex-column w-100 gap-3" onChange={handlePeriod}>
                            <div className="d-flex flex-column flex-md-row gap-3">
                                <div className="input_group">
                                    <label for="day">Peridiocidade</label>
                                    <select className="day w-100" name="day" id="day">
                                        <option value="1">Segunda-feira</option>
                                        <option value="2">Terça-feira</option>
                                        <option value="3">Quarta-feira</option>
                                        <option value="4">Quinta-feira</option>
                                        <option value="5">Sexta-feira</option>
                                        <option value="6">Sábado</option>
                                        <option value="0">Domingo</option>
                                        <option value="7" selected>Sem peridiocidade</option>
                                    </select>
                                </div>
                                <div className="input_group">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label for="turno">Turno(s)</label>
                                    </div>
                                    <div className="content-turnos d-flex flex-wrap flex-md-nowrap gap-3">
                                        {turnosSelected.map((turno) => <TurnoElement turno={turno} />)}
                                        <div className="dropdown">
                                            <button className="adicionar outlined text-nowrap d-flex align-items-center gap-3 w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <PlusCircle size={22} />
                                                <span>Adicionar turno</span>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {turnosSelect.map((turno) => {
                                                    if (turno) {
                                                        return <button type="button" onClick={() => handleTurnosSelected(turno)} class="dropdown-item">{turno.nome}</button>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-md-row gap-3">
                                <div className="input_group">
                                    <label for="init_date">Data inicial</label>
                                    <input className="textfield" type="date" name="init_date" defaultValue={date.day} min={moment().format("YYYY-MM-DD")} id="init_date" />
                                </div>
                                <div className="input_group">
                                    <label for="end_date">Data final</label>
                                    <input className="textfield" type="date" name="end_date" defaultValue={date.day} min={moment().format("YYYY-MM-DD")} id="end_date" />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap w-100 gap-3">
                            {daysSelected.map((day) => <DayElement day={day} />)}
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <input className="textfield" type="text" name="activity" id="activity" placeholder="Qual a atividade da reserva?" />
                            </div>
                            <div className="input_group align-items-end">
                                <label for="quantity_people">Nº de pessoas</label>
                                <input className="textfield w-75" placeholder="Nº" type="number" name="quantity_people" id="quantity_people" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" cols="30" rows="10"></textarea>
                        </div>
                        <button className="green">Reservar</button>
                    </form>
                )
            } else {
                return (
                    <form onSubmit={handleCreateReserva}>
                        {/* <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" type="text" name="registration" id="registration" />
                            </div>
                        </div> */}
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="turno">Turno</label>
                                <input className="textfield" type="text" value={date.turno.name} data-id-turno={date.turno.id} name="alunoturno" id="alunoturno" readOnly />
                            </div>
                            <div className="input_group">
                                <label for="init_date">Data</label>
                                <input className="textfield" type="date" name="init_date" value={date.day} readOnly id="init_date" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <input className="textfield" type="text" name="activity" id="activity" placeholder="Qual a atividade da reserva?" />
                            </div>
                            <div className="input_group align-items-end">
                                <label for="quantity_people">Nº de pessoas</label>
                                <input className="textfield w-75" placeholder="Nº" type="number" name="quantity_people" id="quantity_people" />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" cols="30" rows="10"></textarea>
                        </div>
                        <button type="submit" className="green">Reservar</button>
                    </form>
                )
            }
        } else {
            if (admin) {
                return (
                    <form action="">
                        <div className="d-flex flex-column flex-md-row w-100 gap-3">
                            <div className="input_group">
                                <label for="full_name">Nome completo</label>
                                <input className="textfield" placeholder="Nome completo" value={"Yuri Silva de Lima"} readOnly type="text" name="full_name" id="full_name" />
                            </div>
                            <div className="input_group">
                                <label for="registration">Matrícula</label>
                                <input className="textfield" placeholder="Matrícula" value={"512314"} readOnly type="text" name="registration" id="registration" />
                            </div>
                        </div>
                        <div className="d-flex w-100 gap-3">
                            <div className="input_group">
                                <label for="period">Período</label>
                                <select name="period" disabled="true" id="period">
                                    <option value="AB1" selected>AB | MANHÃ</option>
                                    <option value="CD1">CD | MANHÃ</option>
                                    <option value="AB2">AB | TARDE</option>
                                    <option value="CD2">CD | TARDE</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label for="init_date">Data inicial</label>
                                <input className="textfield" type="date" name="init_date" value={moment().format("YYYY-MM-DD")} readOnly id="init_date" />
                            </div>
                            <div className="input_group">
                                <label for="end_date">Data final</label>
                                <input className="textfield" type="date" name="end_date" value={"2023-06-13"} readOnly id="end_date" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100">
                            <div className="input_group">
                                <label for="activity">Atividade</label>
                                <input type="text" className="textfield" value={sala.reserva.atividade} />
                                {/* <select name="activity" id="activity" disabled="true">
                                    <option value="Estudar com amigos">Estudar com amigos</option>
                                    <option value="Descansar" selected>Descansar depois de um dia chato</option>
                                    <option value="Sei lá mano">Sei lá mano</option>
                                    <option value="Fofocar">Fofocar</option>
                                </select> */}
                            </div>
                            <div className="input_group align-items-end">
                                <label for="people">Nº de pessoas</label>
                                <input className="textfield w-50" placeholder="Nº" type="number" name="people" id="people" value={2} readOnly />
                            </div>
                        </div>
                        <div className="input_group">
                            <label for="justification">Justificativa</label>
                            <textarea name="justification" id="justification" value={sala.reserva.justificativa} cols="30" rows="10" readOnly></textarea>
                        </div>
                        <button className="red w-auto">Desabilitar reserva</button>
                    </form>
                )
            }
        }
    }

    const configureModalReserva = () => {
        return (
            <ModalBody isOpen={modalReserva}>
                <ModalHeader title={admin ? !sala.disponivel ? "Ver reserva" : "Fazer reserva" : "Fazer reserva"} subtitle={`${sala.nome}, BLOCO ${sala.bloco.numero}`} onClose={closeModalReserva} />
                <ModalSection>
                    {configureFormsReserva()}
                </ModalSection>
            </ModalBody>
        )
    }

    const configureModalFeedback = () => {
        return (
            <ModalBody isOpen={modalFeedback}>
                <ModalHeader title="Adicionar Feedback" subtitle={`${sala.nome}, BLOCO ${sala.bloco.numero}`} onClose={closeModalFeeedback} />
                <ModalSection>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Material com defeito</label>
                            <input className="textfield" placeholder="Diga o material que tá com defeito" type="email" name="" id="" />
                        </div>
                        <div className="input_group">
                            <label for="Remember">Descrição do defeito</label>
                            <textarea name="" placeholder="Descreva o problema citado" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button>Adicionar</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }

    const handleUpdateSala = (event) => {
        event.preventDefault()


        const nome = document.querySelector("#name").value
        const bloco = document.querySelector("#bloco.ativo").getAttribute("data-bloco-id")
        const capacidade = document.querySelector("#capacity").value

        console.log(nome, bloco, capacidade, materiais)


        axios.put(`http://localhost:3002/salas/atualizar/${sala._id}`, { nome, bloco, capacidade, reservas: [], materiais }).then((response) => {
            closeModalEditSala()
            updateSalas()
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleDeleteSala = (event) => {
        event.preventDefault()

        axios.delete(`http://localhost:3002/salas/remover/${sala._id}`).then((response) => {
            alert("Sala removida com sucesso")
            closeModalEditSala()
        }).catch((error) => {
            console.log(error)
        })
    }

    const configureModalEditSala = () => {
        return (
            <ModalBody isOpen={modalEditSala}>
                <ModalHeader title={"Editar sala"} onClose={closeModalEditSala} />
                <ModalSection>
                    <form>
                        <div className="d-flex flex-column w-100 flex-md-row justify-content-between gap-4 ">
                            <div className="input_group">
                                <label for=" name">Nome da sala</label>
                                <input className="textfield" type="text" name="name" id="name" defaultValue={sala.nome} />
                            </div>
                            <div className="input_group w-auto">
                                <label for=" name">Bloco {sala.bloco.numero}</label>
                                <div className="blocos d-flex gap-3">
                                    {blocos.map((bloco) => {
                                        if (bloco._id === sala.bloco._id) {
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
                            <input className="textfield" type="number" name="capacity" id="capacity" defaultValue={sala.capacidade} />
                        </div>
                        <div className="input_group">
                            <label>Materiais disponíveis</label>
                            <div className="d-flex flex-column flex-md-row gap-2 border">
                                {materiais.map((material) => {
                                    return (
                                        <div>
                                            <input type="checkbox" id={material.nome} name={material.nome} checked={material.status} value={material.nome} onChange={toogleMateriais} />
                                            <label for={material.nome} className="text-capitalize">{material.nome}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <button className="red" onClick={handleDeleteSala}>Apagar sala</button>
                        <button className="green" onClick={handleUpdateSala}>Editar sala</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }

    const configureModalQueixa = () => {
        return (
            <ModalBody isOpen={modalQueixa}>
                <ModalHeader title="Fazer Queixa" subtitle={`${sala.nome}, BLOCO ${sala.bloco.numero}`} onClose={closeModalQueixa} />
                <ModalSection>
                    <form action="">
                        <div className="input_group">
                            <label for="Remember">Material com defeito</label>
                            <input className="textfield" placeholder="Diga o material que tá com defeito" type="email" name="" id="" />
                        </div>
                        <div className="input_group">
                            <label for="Remember">Descrição do defeito</label>
                            <textarea name="" placeholder="Descreva o problema citado" id="" cols="30" rows="10"></textarea>
                        </div>
                        <button>Adicionar</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }


    const qualModal = () => {
        if (sala.disponivel) {
            return configureModalReserva()
        } else {
            if (admin) {
                return configureModalReserva()
            } else {
                return configureModalQueixa()
            }
        }
    }

    const removeContentTurno = (id) => {
        setTurnosSelected((prevTurnosSelected) => {
            return prevTurnosSelected.filter((turno) => turno._id !== id)
        })
    }

    const TurnoElement = ({ turno }) => {
        return (
            <>
                <div class="turno-element d-flex align-items-center justify-content-between ps-3 gap-2 flex-grow-1" data-turno-id={turno._id}>
                    <span className="text-nowrap">{turno.nome}</span>
                    <button type="button" class="rounded-button" data-turno-id="${turno._id}" onClick={() => removeContentTurno(turno._id)}>
                        <Trash size={18} />
                    </button>
                </div>
            </>
        )
    }

    const DayElement = ({ day }) => {
        return (
            <div className="d-flex flex-grow-1 gap-3 flex-column p-3 border border-secondary rounded">
                <span>{moment(day.dia).format("dddd, DD [de] MMMM")}</span>
                <div className="d-flex gap-3 flex-wrap">
                    {turnosSelected.map((turno) => <TurnoElement turno={turno} />)}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="sala">
                <header onClick={(event) => toggleActiveClassroom(event.target)}>
                    <div className="d-flex gap-3 align-items-center">
                        <h1>{sala.nome}</h1>
                        {admin ?
                            <button className="rounded-button" onClick={openModalEditSala}>
                                <Edit2Icon size={16} />
                            </button>
                            : null}
                    </div>
                    <div className="icons">
                        <span>
                            <img src={projetor_icon} alt="" />
                        </span>
                        <span>
                            <img src={ar_icon} alt="" />
                        </span>
                    </div>
                    {reservavel ?
                        <>
                            <h1 className={sala.disponivel ? "disponivel" : "indisponivel"}>{sala.disponivel ? "disponivel" : "reservado"}</h1>
                            {sala.disponivel ?
                                <button className="green" onClick={openModalReserva}>Fazer Reserva</button>
                                : admin ?
                                    <button className="red" onClick={openModalReserva}>Ver reserva</button>
                                    :
                                    <button className="red" onClick={openModalQueixa}>Fazer Queixa</button>
                            }
                        </>
                        :
                        <h1 className="indisponivelParaReservas">Indisponível para reservas</h1>
                    }
                </header>
                <aside>
                    <section>
                        <div>
                            <span>Materiais da sala</span>
                            <ul className="m-0 p-0">
                                {
                                    sala.materiais.map((material) => {
                                        if (material.status) {
                                            return <li className="text-capitalize">{material.nome}</li>
                                        } else {
                                            return <li className="text-capitalize text-danger">{material.nome}</li>
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <span>Capacidade</span>
                            <p>{sala.capacidade}</p>
                        </div>
                    </section>
                    <div className="d-flex w-100 gap-2 justify-content-end">
                        {!admin ?
                            <button className="outlined" onClick={openModalFeedback}>Dar feedback</button>
                            : null
                        }
                        {sala.disponivel ?
                            <button className="green d-md-none" onClick={openModalReserva}>Fazer Reserva</button>
                            : admin ?
                                <button className="red d-md-none" onClick={openModalReserva}>Ver reserva</button>
                                :
                                <button className="red d-md-none" onClick={openModalQueixa}>Fazer Queixa</button>
                        }
                    </div>
                </aside>
            </div>
            {configureModalFeedback()}
            {configureModalEditSala()}
            {qualModal()}
        </>
    )
}

export default Sala