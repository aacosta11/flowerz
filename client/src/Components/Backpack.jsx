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
                    {props.items.map(item => <div className="item" key={item.id} >
                        <h4>{item.title}</h4>
                        <button onClick={()=>openThisItem(item)}>open</button>
                    </div>)}
                </div>
            </div>
        </div>}
        {isItemOpen && <div className="backpack-overlay" >
            <div className="close-backpack" onClick={()=>setIsItemOpen(false)}></div>
            <div className="backpack-content">
                {/* <h4>{itemToShow.title}</h4>
                <p>{itemToShow.header}</p>
                <p>{itemToShow.body}</p>
                <p>{itemToShow.footer}</p> */}
                <Message title={itemToShow.title} header={itemToShow.header} body={itemToShow.body} footer={itemToShow.footer}/>
            </div>    
        </div>}
    </>)
}
export default Backpack;