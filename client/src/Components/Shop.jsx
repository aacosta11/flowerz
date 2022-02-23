import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminContext from "../Context/AdminContext";
import EnvironmentContext from "../Context/EnvironmentContext";
import SecretUserContext from "../Context/SecretUserContext";
import './Shop.css';
const Shop = props => {
    const { isSecretUser } = useContext(SecretUserContext);

    const { isAdmin } = useContext(AdminContext);

    const { apiRoute } = useContext(EnvironmentContext);

    const [shopIsOpen, setShopIsOpen] = useState(false);

    const [itemsForSale, setItemsForSale] = useState([]);

    const [secretItemsForSale, setSecretItemsForSale] = useState([]);
    
    useEffect(() => {
        getMessages()
            .then(res => setItemsForSale(res))
            .catch(err => console.log(err));
        if (isSecretUser || sessionStorage.getItem('isSecretUser')) {
            getSecrets()
                .then(res => setSecretItemsForSale(res))
                .catch(err => console.log(err));
        }
    }, [])

    const getMessages = async () => {
        return await axios.get(`${apiRoute}/text`)
            .then(res => res.data)
            .catch(err => console.log(err));
    }

    const getSecrets = async () => {
        return await axios.get(`${apiRoute}/secret`)
            .then(res => res.data)
            .catch(err => console.log(err));
    }

    const handlePurchase = (e) => {
        if (props.count < e.cost) return;
        props.purchase(e);
        let shopCopy = itemsForSale.filter(item => item._id !== e._id);
        setItemsForSale(shopCopy);
        return
    }

    const handleSecretPurchase = (e) => {
        if (props.count < e.cost) return;
        props.purchase(e);
        let shopCopy = secretItemsForSale.filter(item => item._id !== e._id);
        setSecretItemsForSale(shopCopy);
        return
    }

    const handleDelete = (e) => {
        axios.delete(`${apiRoute}/text/${e._id}`)
            .then(res => {
                let shopCopy = itemsForSale.filter(item => item._id !== e._id);
                setItemsForSale(shopCopy);
            })
            .catch(err => console.log(err));
    }

    const handleSecretDelete = (e) => {
        axios.delete(`${apiRoute}/secret/${e._id}`)
            .then(res => {
                let shopCopy = secretItemsForSale.filter(item => item._id !== e._id);
                setSecretItemsForSale(shopCopy);
            })
            .catch(err => console.log(err));
    }

    return (<>
        <button className="shop" onClick={() => setShopIsOpen(true)}>shop</button>

        {shopIsOpen && <div className="shop-overlay" >
            <div className="close-shop" onClick={() => setShopIsOpen(false)}></div>
            <div className="shop-content">
                <h2>welcome!</h2>
                <p>flowers available: {props.count}</p>
                    {itemsForSale.length < 1 && secretItemsForSale < 1 ?
                        <p>no items for sale</p>
                        :
                        <>
                            <div className="items">
                                {itemsForSale.map((item, i) => <div className="item" key={i} name={item.cost} id={item._id}>
                                    <h4>{item.title}</h4>
                                    <p>cost: {item.cost}</p>
                                    {isAdmin && <button onClick={() => handleDelete(item)}>delete</button>}
                                    {props.count >= item.cost ? <button onClick={() => handlePurchase(item)}>buy</button> : <button disabled>buy</button>}
                                </div>)}
                                {secretItemsForSale.length > 0 && 
                                    <>
                                        {secretItemsForSale.map((item, i) => <div className="item" key={i} name={item.cost} id={item._id}>
                                            <h4>{item.title}</h4>
                                            <p>cost: {item.cost}</p>
                                            {isAdmin && <button onClick={() => handleSecretDelete(item)}>delete</button>}
                                            {props.count >= item.cost ? <button onClick={() => handleSecretPurchase(item)}>buy</button> : <button disabled>buy</button>}
                                        </div>)}
                                    </>}
                            </div>
                        </>}
                    
            </div>
        </div>}
    </>)
}
export default Shop;