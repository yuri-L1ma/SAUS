import Menu from "../components/Menu"
import Sala from "../components/Sala"
import css from "./Home.css";

const Home = () => {
    const toogleButtonColor = (ob) => {
        const buttons = document.querySelectorAll(".blocos button")
        
        if(!ob.classList.contains("ativo")){
            for(let button of buttons){
                if(button != ob){
                    button.classList.remove("ativo")
                }
            }
    
            ob.classList.toggle("ativo")
        }
    }

    return (
        <>
            <Menu />
            <section className="filters">
                <div className="period">
                    <select name="" id="">
                        <option value="">Hoje</option>
                        <option value="">Amanha</option>
                        <option value="">26/12</option>
                        <option value="">26/12</option>
                    </select>
                    <select name="" id="">
                        <option value="">AB / Manhã</option>
                        <option value="">CD / Manhã</option>
                        <option value="">Almoço</option>
                        <option value="">AB / Tarde</option>
                        <option value="">CD / Tarde</option>
                    </select>
                </div>
                <div className="blocos">
                    <button onClick={(event)=>toogleButtonColor(event.target)} className="ativo">B1</button>
                    <button onClick={(event)=>toogleButtonColor(event.target)}>B2</button>
                    <button onClick={(event)=>toogleButtonColor(event.target)}>B3</button>
                    <button onClick={(event)=>toogleButtonColor(event.target)}>B4</button>
                </div>
            </section>
            <main className="salas">
                <h5>Salas</h5>
                <section className="lista_sala">
                    <Sala disponivel={true}> </Sala>
                    <Sala disponivel={true}> </Sala>
                    <Sala disponivel={false}> </Sala>
                    <Sala disponivel={true}> </Sala>
                    <Sala disponivel={false}> </Sala>
                    <Sala disponivel={false}> </Sala>
                </section>
            </main>
        </>
    )
}

export default Home