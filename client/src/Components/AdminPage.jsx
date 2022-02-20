import React, { useState, useContext } from "react";
import axios from "axios";
import './AdminPage.css';
import AdminContext from "../Context/AdminContext";
const AdminPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {isAdmin} = useContext(AdminContext);
    const [message,setMessage] = useState({title:'',header:'',body:'',footer:'',cost:0});
    const [secretMessage,setSecretMessage] = useState({title:'',header:'',body:'',footer:'',cost:0});

    const handleMessageSubmit = () => {
        axios.post('http://localhost:8000/api/text', message)
        .then(res => {console.log(res.data)})
        .catch(err => {console.log(err)});
    }

    const handleSecretMessageSubmit = () => {
        axios.post('http://localhost:8000/api/secret', secretMessage)
        .then(res => {console.log(res.data)})
        .catch(err => {console.log(err)});
    }

    return (<>
    {isAdmin && 
        <>
            <button className="adminPage" onClick={()=>setIsOpen(true)}>admin</button>
            {isOpen && <div className="adminPage-overlay" >
                <div className="close-adminPage" onClick={()=>setIsOpen(false)}></div>
                <div className="adminPage-content">
                    <h2>admin page</h2>
                    <h4>make message</h4>
                    <div className="make-message">
                        <div className="input-wrap">
                            <label htmlFor="message-title">title:</label>
                            <input type="text" id="message-title" value={message.title} onChange={(e)=>setMessage({...message,title:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="message-header">header:</label>
                            <input type="text" id="message-header" value={message.header} onChange={(e)=>setMessage({...message,header:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="meassage-body">body:</label>
                            <input type="text" id="message-body" value={message.body} onChange={(e)=>setMessage({...message,body:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="message-footer">footer</label>
                            <input type="text" id="message-footer" value={message.footer} onChange={(e)=>setMessage({...message,footer:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="message-cost">cost</label>
                            <input type="number" id="message-cost" value={message.cost} onChange={(e)=>setMessage({...message,cost:e.target.value})} />
                        </div>
                        <input type="submit" value="create message" onClick={handleMessageSubmit}  />
                    </div>

                    <h4>make secret message</h4>
                    <div className="make-message">
                        <div className="input-wrap">
                            <label htmlFor="secretMessage-title">title:</label>
                            <input type="text" id="secretMessage-title" value={secretMessage.title} onChange={(e)=>setSecretMessage({...secretMessage,title:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="secretMessage-header">header:</label>
                            <input type="text" id="secretMessage-header" value={secretMessage.header} onChange={(e)=>setSecretMessage({...secretMessage,header:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="meassage-body">body:</label>
                            <input type="text" id="secretMessage-body" value={secretMessage.body} onChange={(e)=>setSecretMessage({...secretMessage,body:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="secretMessage-footer">footer</label>
                            <input type="text" id="secretMessage-footer" value={secretMessage.footer} onChange={(e)=>setSecretMessage({...secretMessage,footer:e.target.value})} />
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="secretMessage-cost">cost</label>
                            <input type="number" id="secretMessage-cost" value={secretMessage.cost} onChange={(e)=>setSecretMessage({...secretMessage,cost:e.target.value})} />
                        </div>
                        <input type="submit" value="create secret message" onClick={handleSecretMessageSubmit} />
                    </div>
                    
                </div>
            </div>}
        </>
    }
    </>)
}
export default AdminPage; 