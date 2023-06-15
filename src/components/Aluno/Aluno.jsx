import { LockIcon, Maximize2Icon, TicketIcon, InboxIcon, SendIcon, ChevronDown } from "lucide-react"
import { useState } from "react"
import { ModalBody, ModalHeader, ModalSection } from "../Modal/Modal"
import "./Aluno.css"

const Aluno = ({ nome, matricula }) => {
    const [modalAluno, setModalAluno] = useState(false)

    const openModalAluno = () => {
        setModalAluno(true)
    }

    const closeModalAluno = () => {
        setModalAluno(false)
    }

    const toggleButtonFocus = (event) => {
        event.target.classList.toggle("focused")
    }


    const configureModalAluno = () => {
        return (
            <ModalBody isOpen={modalAluno}>
                <ModalHeader title={nome} subtitle={matricula} onClose={closeModalAluno} />
                <ModalSection>
                    <div className='d-md-none'>
                        <button className="buttonAluno w-100 my-3" type="button" onClick={toggleButtonFocus} data-toggle="collapse" data-target="#collapseReservas" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Reservas</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseReservas">
                            <div className="d-flex flex-column gap-4">
                                <h1>Reservas vão aqui</h1>
                                {/* {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                } */}
                            </div>
                        </div>
                        <button className="buttonAluno w-100 my-3" onClick={toggleButtonFocus} type="button" data-toggle="collapse" data-target="#collapseQueixasEnviadas" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Queixas enviadas</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseQueixasEnviadas">
                            <div className="d-flex flex-column gap-4">
                                <h1>Queixas enviadas vão aqui</h1>
                                {/* {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                } */}
                            </div>
                        </div>
                        <button className="buttonAluno w-100 my-3" onClick={toggleButtonFocus} type="button" data-toggle="collapse" data-target="#collapseQueixasRecebidas" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Queixas recebidas</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseQueixasRecebidas">
                            <div className="d-flex flex-column gap-4">
                                <h1>Queixa recebida vão aqui</h1>
                                {/* {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                } */}
                            </div>
                        </div>
                        <button className="buttonAluno w-100 my-3" onClick={toggleButtonFocus} type="button" data-toggle="collapse" data-target="#collapseBanimentos" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Banimentos</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseBanimentos">
                            <div className="d-flex flex-column gap-4">
                                <h1>Banimentos vão aqui</h1>
                                {/* {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                } */}
                            </div>
                        </div>
                    </div>
                    <div className='d-none d-md-block'>
                        <ul className="nav nav-pills w-100 justify-content-end gap-5" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active w-100 d-flex gap-3 align-items-center p-3" id="pills-reservas-tab" data-bs-toggle="pill" data-bs-target="#pills-reservas" type="button" role="tab" aria-controls="pills-reservas" aria-selected="false">
                                    <TicketIcon size={24} />
                                    <span>Reservas</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link w-100 d-flex gap-3 align-items-center p-3" id="pills-queixas-enviadas-tab" data-bs-toggle="pill" data-bs-target="#pills-queixas-enviadas" type="button" role="tab" aria-controls="pills-queixas-enviadas" aria-selected="false">
                                    <SendIcon size={24} />
                                    <span>Queixas enviadas</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link w-100 d-flex gap-3 align-items-center p-3" id="pills-queixas-recebidas-tab" data-bs-toggle="pill" data-bs-target="#pills-queixas-recebidas" type="button" role="tab" aria-controls="pills-queixas-recebidas" aria-selected="true">
                                    <InboxIcon size={24} />
                                    <span>Queixas recebidas</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link w-100 d-flex gap-3 align-items-center p-3" id="pills-banimentos-tab" data-bs-toggle="pill" data-bs-target="#pills-banimentos" type="button" role="tab" aria-controls="pills-banimentos" aria-selected="false">
                                    <LockIcon size={24} />
                                    <span>Banimentos</span>
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-reservas" role="tabpanel" aria-labelledby="pills-reservas-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    <h1>Reservas</h1>
                                    {/* {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    } */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-queixas-recebidas" role="tabpanel" aria-labelledby="pills-queixas-recebidas-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    <h1>Queixas recebidas</h1>
                                    {/* {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    } */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-queixas-enviadas" role="tabpanel" aria-labelledby="pills-queixas-enviadas-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    <h1>Queixas enviadas</h1>
                                    {/* {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    } */}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-banimentos" role="tabpanel" aria-labelledby="pills-banimentos-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    <h1>Banimento</h1>
                                    {/* {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalSection>
            </ModalBody>
        )
    }

    return (
        <>
            <div className="aluno">
                <header className="gap-3">
                    <div className="d-flex gap-md-5 gap-2 flex-wrap w-100">
                        <h1 className="text-nowrap">{nome}</h1>
                        <h1>{matricula}</h1>
                    </div>
                    <button className="d-flex align-items-center gap-3 justify-content-center" onClick={openModalAluno}>
                        <Maximize2Icon size={20} />
                        <span className="text-nowrap d-none d-md-block">Ver mais</span>
                    </button>
                </header>
            </div>
            {configureModalAluno()}
        </>
    )
}

export default Aluno