import { useContext, useEffect } from "react"
//import { AuthContexto } from "./AuthProvider"
import { ContextoGambiarra } from "./ContextoGambiarra"
//import Login from "../pages/Login/Login"
import { useNavigate } from "react-router-dom"

const RequereAuth = ({ children }) => {
    const navigate = useNavigate()

    const auth = useContext(ContextoGambiarra)

    useEffect(() => {

        console.log(auth.user.id)

        if (!typeof(auth.user.id) === "string") {
            navigate("/login")
            //return <Login />
        }

    }, [])


    return children
}

export default RequereAuth