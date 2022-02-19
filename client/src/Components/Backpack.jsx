import React, { useState } from "react";
import Message from "./Messages";
import './Backpack.css';
const Backpack = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [isItemOpen,setIsItemOpen] = useState(false);
    const [itemToShow,setItemToShow] = useState({});

    const openThisItem = (e) => {
        setIsItemOpen(true);
        setItemToShow(e);
    }

    return (<>
        <button className="backpack" onClick={()=>setIsOpen(true)}>backpack</button>
        {isOpen && <div className="backpack-overlay" >
            <div className="close-backpack" onClick={()=>setIsOpen(false)}></div>
            <div className="backpack-content">
                <h2>these are your items!</h2>
                <div className="items">
                    {props.items.length > 0 ? 
                    <>
                    {props.items.map(item => <div className="item" key={item.id} >
                        <h4>{item.title}</h4>
                        <button onClick={()=>openThisItem(item)}>open</button>
                    </div>)}
                    </>
                    :
                    <p>nothing to see here...</p>}
                </div>
            </div>
        </div>}
        {isItemOpen && <div className="backpack-overlay" >
            <div className="close-backpack" onClick={()=>setIsItemOpen(false)}></div>
            <div className="backpack-content">
                <Message title={itemToShow.title} header={itemToShow.header} body={itemToShow.body} footer={itemToShow.footer}/>
            </div>    
        </div>}
    </>)
}
export default Backpack;