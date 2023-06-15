import { SearchIcon } from "lucide-react"
import Menu from "../../components/Menu/Menu"
import Aluno from "../../components/Aluno/Aluno"
import "./Alunos.css"

const Alunos = () => {


    const alunos = [
        { nome: "Mario José", matricula: "339383", },
        { nome: "Hercules Lima", matricula: "609868", },
        { nome: "Milena Farias", matricula: "5096043", },
        { nome: "Herbeth Richers", matricula: "069893", },
        { nome: "Oliveira Limão", matricula: "989589", },
        { nome: "Manoel Seboso", matricula: "123499", },
        { nome: "Maionesen Temperada", matricula: "233231", }
    ]

    return (
        <>
            <Menu />
            <main>
                <div className="mb-3 ms-1 d-flex align-items-md-center flex-column flex-md-row w-100 justify-content-between gap-3">
                    <h5 className="">Alunos</h5>
                    <form action="#">
                        <div className="search_input d-flex align-items-center gap-3">
                            <input type="text" className="textfield" name="" id="" placeholder="Pesquisar" />
                            <SearchIcon size={28} stroke="#2376D7" />
                        </div>
                    </form>
                </div>
                <section className="alunos mt-4">
                    <div className="d-flex flex-column flex-wrap flex-md-row gap-4">
                        {
                            alunos.map((aluno) => {
                                return <Aluno nome={aluno.nome} matricula={aluno.matricula}/>
                            })
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Alunos