import React, { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import AdminContext from "../Context/AdminContext";
import "./Logout.css";
const Logout = props => {
    const { setIsLogInOpen } = useContext(LoginContext);
    const { setIsAdmin } = useContext(AdminContext);
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("flowers");
        setIsAdmin(false);
        setIsLogInOpen(true);
    }
    return (<>
        <p className="logout" onClick={handleLogout}>logout</p>
    </>)
}
export default Logout;