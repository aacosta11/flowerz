import React, { useState, useContext } from "react";
import axios from "axios";
import LoginContext from "../Context/LoginContext";
import title from '../img/title.png';
import './Login.css';
const Login = props => {
    const {setUser} = useContext(LoginContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error,setError] = useState("");

    const [isLoginOpen,setIsLoginOpen] = useState(true);

    const [isLoading,setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);
        axios.get('http://localhost:8000/api/login', {username})
        .then(res => {
            if (res.data.password === password) {
                setIsLoginOpen(false);
                setUser(username);
                setError("");
                setIsLoading(false);
            }
        })
        .catch(err => {
            setError("Invalid username or password");
            console.log(err);
            setPassword("");
            setIsLoading(false);
        });
        console.log(username, password);
    }
    return (<>
        {isLoginOpen && 
        <>
            <div className="login-overlay">
                <div className="login-container">
                    <img src={title} alt="" id="title"/>
                    <div className="login-form" >
                        <h2>login</h2>
                        <div id="username-wrap" className="input-wrap">
                            <label htmlFor="username">username:</label>
                            <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div id="password-wrap" className="input-wrap">
                            <label htmlFor="password">password:</label>
                            <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>

                        {isLoading ? <div className="loading">loading...</div> : <button className="login-btn" onClick={handleLogin}>login</button>}
                        
                    </div>
                    <h4 className="error">{error}</h4>
                </div>
            </div>
        </>}
    </>)
}
export default Login;