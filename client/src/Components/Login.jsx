import React, { useState, useEffect, useContext } from "react";
import LoginContext from "../Context/LoginContext";
import axios from "axios";
import title from '../img/title.png';
import AdminContext from "../Context/AdminContext";
import SecretUserContext from "../Context/SecretUserContext";
import EnvironmentContext from "../Context/EnvironmentContext";
import './Login.css';
const Login = props => {
    const { isLogInOpen,setIsLogInOpen } = useContext(LoginContext);
    const { setIsSecretUser } = useContext(SecretUserContext);
    const {setIsAdmin} = useContext(AdminContext);
    const {apiRoute} = useContext(EnvironmentContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error,setError] = useState("");

    const [isRegisterOpen,setIsRegisterOpen] = useState(false);

    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        if (sessionStorage.getItem('user')) {
            setIsLogInOpen(false);
            if (sessionStorage.getItem('isAdmin') === true) setIsAdmin(true);
            return
        }
        setIsLogInOpen(true);
    },[])

    const handleLogin = () => {
        setIsLoading(true);
        axios.get(`${apiRoute}/users/${username}` )
        .then(res => {
            if (res.data.password === password) {
                setIsLoading(false);
                setError("");
                sessionStorage.setItem('user', username);
                if (username === 'admin') {
                    setIsAdmin(true);
                    sessionStorage.setItem('isAdmin', true);
                    console.log('admin logged in');
                } else if (username === 'flowerz') {
                    setIsSecretUser(true);
                    sessionStorage.setItem('isSecretUser', true);
                    console.log('secret user logged in');
                }
                setPassword("");
                setIsLogInOpen(false);
                return
            }
            setError("Invalid username or password");
            setIsLoading(false);
            setPassword("");
        })
        .catch(err => {
            setError("Invalid username or password");
            console.log(err);
            setPassword("");
            setIsLoading(false);
        });
    }

    const handleRegister = () => {
        setIsLoading(true);
        axios.post(`${apiRoute}/users`, {username,password})
        .then(res => {
            sessionStorage.setItem('user', username);
            setIsRegisterOpen(false);
            setError("");
            setIsLoading(false);
        })
        .catch(err => {
            if (password.length < 4) {setError("Password too short!")}
            if (err.response.data.code === 11000) {setError("Username already taken!")}
            console.log(err.response.data);
            setPassword("");
            setIsLoading(false);
        });
    }

    return (<>
        {isLogInOpen && 
        <>
            <div className="login-overlay">
                <div className="login-container">
                    <img src={title} alt="" id="title"/>
                    <div className="login-form" >
                        {isRegisterOpen ? <h2>register</h2> : <h2>login</h2>}
                        
                        <div id="username-wrap" className="input-wrap">
                            <label htmlFor="username">username:</label>
                            <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)} value={username} />
                        </div>
                        <div id="password-wrap" className="input-wrap">
                            <label htmlFor="password">password:</label>
                            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                        </div>

                        {isLoading ? 
                        <div className="loading">loading...</div> 
                        : 
                        <>
                        {isRegisterOpen ? 
                            <button className="login-btn" onClick={handleRegister}>register</button> 
                            : 
                            <button className="login-btn" onClick={handleLogin}>login</button>}
                        </>}

                        <p className="login-register-switch" onClick={()=>setIsRegisterOpen(!isRegisterOpen)}>{isRegisterOpen ? 'have an account?' : 'create account'}</p>

                    </div>
                    {error ? <p className="error">{error}</p> : <p>&nbsp;</p>}
                </div>
            </div>
        </>}
    </>)
}
export default Login;