import { NavLink } from 'react-router-dom'
import Menu from '../../components/Menu/Menu'
import Queixa from '../../components/Queixa/Queixa'
import './Queixas.css'
import { ArrowLeft, ChevronDown, InboxIcon, SendIcon } from 'lucide-react'

const Queixas = () => {
    const queixas = [{ motivo: "Menino réi danado", data: "23/04/23" }, { motivo: "Sujou a porta de catarro", data: "13/07/22" }, { motivo: "Chamou a tia de limpeza de mocreia", data: "02/02/21" }, { motivo: "Usando vape na aula do calado", data: "10/11/13" }]

    const toggleButtonFocus = (event) => {
        event.target.classList.toggle("focused")
    }


    return (
        <>
            <Menu />
            <main>
                <NavLink to={"/"} className={"text-decoration-none d-md-none"}>
                    <div className="item d-flex gap-2 pb-3 align-items-center">
                        <ArrowLeft size={24} />
                        <h1 style={{ color: '#2376D7', fontWeight: "bolder" }}>Minhas queixas</h1>
                    </div>
                </NavLink>
                <section className="queixas mt-2">
                    <div className='d-md-none'>
                        <button className="buttonQueixa w-100 my-3" type="button" onClick={toggleButtonFocus} data-toggle="collapse" data-target="#collapseQueixasRecebidas" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Queixas recebidas</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseQueixasRecebidas">
                            <div className="d-flex flex-column gap-4">
                                {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                }
                            </div>
                        </div>
                        <button className="buttonQueixa w-100 my-3" onClick={toggleButtonFocus} type="button" data-toggle="collapse" data-target="#collapseQueixasEnviadas" aria-expanded="false" aria-controls="collapseExample">
                            <h4>Queixas enviadas</h4>
                            <ChevronDown size={24} color='#2376D7' />
                        </button>
                        <div className="collapse" id="collapseQueixasEnviadas">
                            <div className="d-flex flex-column gap-4">
                                {
                                    queixas.map((queixa) => {
                                        return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='d-none d-md-block'>
                        <ul className="nav nav-pills w-100 justify-content-end gap-5" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link w-100 d-flex gap-3 align-items-center p-3" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-queixas-enviadas" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                    <SendIcon size={24} />
                                    <span>Queixas enviadas</span>
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active w-100 d-flex gap-3 align-items-center p-3" id="pills-queixas-recebidas-tab" data-bs-toggle="pill" data-bs-target="#pills-queixas-recebidas" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                    <InboxIcon size={24} />
                                    <span>Queixas recebidas</span>
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-queixas-recebidas" role="tabpanel" aria-labelledby="pills-queixas-recebidas-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    }
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-queixas-enviadas" role="tabpanel" aria-labelledby="pills-queixas-enviadas-tab">
                                <div className="d-flex flex-column gap-4 mt-4">
                                    {
                                        queixas.map((queixa) => {
                                            return <Queixa motivo={queixa.motivo} data={queixa.data} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Queixas;