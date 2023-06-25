import Menu from "../../components/Menu/Menu"
import Bloco from "../../components/Bloco/Bloco"
import "./Blocos.css"
import { NavLink } from "react-router-dom"
import seta_azul from "../../assets/icons/setaAzul.svg"
import { useContext, useEffect, useState } from "react"
import { ContextoGambiarra } from "../../utils/ContextoGambiarra"
import { ModalBody, ModalHeader, ModalSection } from "../../components/Modal/Modal"
import { PlusCircle } from "lucide-react"
import axios from "axios"


const Blocos = () => {
    const [blocos, setBlocos] = useState([])
    const [modalCreateBloco, setModalCreateBloco] = useState(false)
    const { admin } = useContext(ContextoGambiarra)

    useEffect(() => {
        axios.get("http://localhost:3002/blocos/listar").then((response) => {
            setBlocos(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleCreateBloco = (event) => {
        event.preventDefault()

        const numero = document.getElementById("numero").value
        const descricao = document.getElementById("description").value

        axios.post("http://localhost:3002/blocos/criar", {numero, descricao, salas: []}).then((response) => {
            alert("Bloco cadastrado com sucesso!")
            closeModalCreateBloco()
            // window.location.reload()
        }).catch((error) => {
            console.log(error)
        })
    }

    const openModalCreateBloco = () => {
        setModalCreateBloco(true)
    }

    const closeModalCreateBloco = () => {
        setModalCreateBloco(false)
    }

    const configureModalCreateBloco = () => {
        return (
            <ModalBody isOpen={modalCreateBloco}>
                <ModalHeader title={"Adicionar bloco"} onClose={closeModalCreateBloco} />
                <ModalSection>
                    <form>
                        <div className="d-flex flex-column w-100 flex-md-row justify-content-between gap-4 ">
                            <div className="input_group">
                                <label for=" name">Número</label>
                                <input className="textfield" type="number" name="numero" id="numero" />
                            </div>
                            <div className="input_group">
                                <label for=" name">Descrição</label>
                                <input className="textfield" type="text" name="description" id="description" />
                            </div>
                        </div>
                        <button className="green" onClick={handleCreateBloco}>Criar bloco</button>
                    </form>
                </ModalSection>
            </ModalBody>
        )
    }


    return (
        <>
            <Menu />
            <main>
                <NavLink to={"/"} className={"d-md-none text-decoration-none"}>
                    <div className="item d-flex gap-2 pb-3">
                        <span className="icon">
                            <img src={seta_azul} alt="" />
                        </span>
                        <h1 style={{ color: '#2376D7', fontWeight: "bolder" }}>Blocos</h1>
                    </div>
                </NavLink>
                <div className="mb-3 ms-1 d-none d-md-flex align-items-md-center flex-column flex-md-row w-100 justify-content-between gap-3">
                    <h5 className="">Blocos</h5>
                    {admin ?
                            <button className="d-flex gap-3 outlined w-auto" onClick={openModalCreateBloco}>
                                <PlusCircle size={24} />
                                <span>Adicionar bloco</span>
                            </button>
                            : null
                        }
                </div>
                <section className="Blocos mt-4">
                    <div className="d-flex flex-column gap-4">
                        {
                            blocos.map((bloco) => {
                                return <Bloco bloco={bloco} />
                            })
                        }
                    </div>
                </section>
                {configureModalCreateBloco()}
            </main>
        </>
    )
}

export default Blocos