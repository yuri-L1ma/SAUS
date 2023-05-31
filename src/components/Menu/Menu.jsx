import "./Menu.css"
import logo from "../../assets/imgs/simplified_logo.png"

const Menu = () => {
    return (
        <>
            <nav className="menu">
                <div className="img_container">
                    <img src={logo} alt="" />
                </div>
                <button type="button">☰</button>
            </nav>
            <nav className="menu-colapse">
                <ul className="menu-colapse">
                    <li>Item</li>
                    <li>Item</li>
                    <li>Item</li>
                </ul>
            </nav>
        </>
    )
}

export default Menu