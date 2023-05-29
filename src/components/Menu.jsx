import css from "./Menu.css"
import logo from "../assets/imgs/simplified_logo.png"

const Menu = () => {
    return (
        <nav className="menu">
            <div className="img_container">
                <img src={logo} alt="" />
            </div>
            <button>☰</button>
            <ul>
                <li>Item</li>
                <li>Item</li>
                <li>Item</li>
            </ul>
        </nav>
    )
}

export default Menu