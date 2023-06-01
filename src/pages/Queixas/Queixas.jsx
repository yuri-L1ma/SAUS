import { NavLink } from 'react-router-dom'
import seta_azul from '../../assets/icons/setaAzul.svg'
import Queixa from '../../components/Queixa/Queixa'
import './Queixas.css'

const Queixas = () => {
    const queixas = [{ motivo: "Menino réi danado", data: "23/04/23" }, { motivo: "Sujou a porta de catarro", data: "13/07/22" }, { motivo: "Chamou a tia de limpeza de mocreia", data: "02/02/21" }, { motivo: "Usando vape na aula do calado", data: "10/11/13" }]

    const toggleButtonFocus = (event) => {
        event.target.classList.toggle("focused")
    }


    return (
        <>
            <NavLink to={"/"} className={"text-decoration-none"}>
                <div className="item d-flex gap-2 pb-3">
                    <span className="icon">
                        <img src={seta_azul} alt="" />
                    </span>
                    <h1 style={{ color: '#2376D7', fontWeight: "bolder" }}>Minhas queixas</h1>
                </div>
            </NavLink>
            <section className="queixas mt-2">
                <button className="buttonQueixa" type="button" onClick={toggleButtonFocus} data-toggle="collapse" data-target="#collapseQueixasRecebidas" aria-expanded="false" aria-controls="collapseExample">
                    <h4>Queixas recebidas</h4>
                    <span>
                        <img src={seta_azul} alt="" />
                    </span>
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
                <button className="buttonQueixa" onClick={toggleButtonFocus} type="button" data-toggle="collapse" data-target="#collapseQueixasEnviadas" aria-expanded="false" aria-controls="collapseExample">
                    <h4>Queixas enviadas</h4>
                    <span>
                        <img src={seta_azul} alt="" />
                    </span>
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
            </section>
        </>
    )
}

export default Queixas;