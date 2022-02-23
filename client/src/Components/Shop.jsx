import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminContext from "../Context/AdminContext";
import EnvironmentContext from "../Context/EnvironmentContext";
import './Shop.css';
const Shop = props => {
    const { isAdmin } = useContext(AdminContext);

    const { apiRoute } = useContext(EnvironmentContext);

    const [shopIsOpen,setShopIsOpen] = useState(false);

    const [itemsForSale,setItemsForSale] = useState([]);

    useEffect(()=>{
        axios.get(`${apiRoute}/text`)
        .then(res => {
            setItemsForSale(res.data);
        })
        .catch(err => console.log(err));
        if (sessionStorage.getItem('user') === "flowerz") {
            axios.get(`${apiRoute}/secret`)
            .then(res => {
                let shopCopy = [...itemsForSale];
                shopCopy.push(res.data);
                setItemsForSale(shopCopy);
            })
            .catch(err => console.log(err));
        }
    },[])

    const handlePurchase = (e) => {
        if (props.count < e.cost) return;
        props.purchase(e);
        let shopCopy = itemsForSale.filter(item => item._id !== e._id);
        setItemsForSale(shopCopy);
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

    return (<>
        <button className="shop" onClick={()=>setShopIsOpen(true)}>shop</button>

        {shopIsOpen && <div className="shop-overlay" >
            <div className="close-shop" onClick={()=>setShopIsOpen(false)}></div>
            <div className="shop-content">
                <h2>welcome!</h2>
                <p>flowers available: {props.count}</p>
                {itemsForSale.length < 1 ? 
                <p>no items for sale</p>
                :
                <>
                <div className="items">
                    {itemsForSale.map((item,i) => <div className="item" key={i} name={item.cost} id={item._id}>
                        <h4>{item.title}</h4>
                        <p>cost: {item.cost}</p>
                        {isAdmin && <button onClick={()=>handleDelete(item)}>delete</button>}
                        {props.count >= item.cost  ? <button onClick={()=>handlePurchase(item)}>buy</button> : <button disabled>buy</button>}
                    </div>)}
                </div>
                </>}
            </div>
        </div>}
    </>)
}
export default Shop;