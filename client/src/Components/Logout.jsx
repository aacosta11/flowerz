import React, { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import "./Logout.css";
const Logout = props => {
    const { setIsLogInOpen } = useContext(LoginContext);
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("flowers");
        setIsLogInOpen(true);
    }
    return (<>
        <p className="logout" onClick={handleLogout}>logout</p>
    </>)
}
export default Logout;