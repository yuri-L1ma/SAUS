import { SearchIcon } from "lucide-react"
import Menu from "../../components/Menu/Menu"
import Aluno from "../../components/Aluno/Aluno"
import "./Alunos.css"
import { NavLink } from "react-router-dom"
import seta_azul from "../../assets/icons/setaAzul.svg"
import { useEffect, useState } from "react"
import axios from "axios"

const Alunos = () => {
    const [alunos, setAlunos] = useState([])
    const [pesquisarTermo, setPesquisarTermo] = useState('')

    useEffect(() => {
        axios.get("http://localhost:3002/alunos/listar")
            .then((response) => {
                setAlunos(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const handlePesquisar = (event) => {
        const pesquisarValor = event.target.value.toLowerCase()
        setPesquisarTermo(pesquisarValor)
    }

    const alunosFiltrados = alunos.filter((aluno) => {
        const nome = aluno.nome.toLowerCase()
        const matricula = aluno.matricula.toString()
        return nome.startsWith(pesquisarTermo) || matricula.startsWith(pesquisarTermo)
    })

    return (
        <>
            <Menu />
            <main>
                <NavLink to={"/"} className={"d-md-none text-decoration-none"}>
                    <div className="item d-flex gap-2 pb-3">
                        <span className="icon">
                            <img src={seta_azul} alt="" />
                        </span>
                        <h1 style={{ color: '#2376D7', fontWeight: "bolder" }}>Alunos</h1>
                    </div>
                </NavLink>
                <div className="mb-3 ms-1 d-flex align-items-md-center flex-column flex-md-row w-100 justify-content-between gap-3">
                    <h5 className="d-md-block d-none">Alunos</h5>
                    <form action="#">
                        <div className="search_input d-flex align-items-center gap-3">
                            <input
                                type="text"
                                className="textfield"
                                name=""
                                id=""
                                placeholder="Pesquisar"
                                value={pesquisarTermo}
                                onChange={handlePesquisar}
                            />
                            <SearchIcon size={28} stroke="#2376D7" />
                        </div>
                    </form>
                </div>
                <section className="alunos mt-4">
                    <div className="d-flex flex-column flex-wrap flex-md-row gap-4">
                        {
                            alunosFiltrados.map((aluno) => (
                                <Aluno aluno={aluno} />
                            ))
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Alunos
