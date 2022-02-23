import React, { useContext } from "react";
import LoginContext from "../Context/LoginContext";
import AdminContext from "../Context/AdminContext";
import SecretUserContext from "../Context/SecretUserContext";
import "./Logout.css";
const Logout = props => {
    const { setIsLogInOpen } = useContext(LoginContext);
    const { setIsAdmin } = useContext(AdminContext);
    const { setIsSecretUser } = useContext(SecretUserContext);
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isAdmin");
        sessionStorage.removeItem("isSecretUser");
        setIsSecretUser(false);
        setIsAdmin(false);
        setIsLogInOpen(true);
    }
    return (<>
        <p className="logout" onClick={handleLogout}>logout</p>
    </>)
}
export default Logout;