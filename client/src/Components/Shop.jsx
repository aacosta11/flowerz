import React, { useState, useEffect } from "react";
import axios from "axios";
import './Shop.css';
const Shop = props => {
    const [shopIsOpen,setShopIsOpen] = useState(false);

    const [itemsForSale,setItemsForSale] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/text`)
        .then(res => {
            setItemsForSale(res.data);
        })
        .catch(err => console.log(err));
        if (props.count >= 100 && sessionStorage.getItem('user') === "habibi") {
            axios.get(`http://localhost:8000/api/secret`)
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
        
        for (let x in itemsForSale) {
            if (itemsForSale[x].id === e.id) {
                props.purchase(itemsForSale[x]);
                setItemsForSale(itemsForSale.filter(item => item.id !== e.id))
                return
            }
        }
        props.purchase(e)
    }

    return (<>
        <button className="shop" onClick={()=>setShopIsOpen(true)}>shop</button>
        {shopIsOpen && <div className="shop-overlay" >
            <div className="close-shop" onClick={()=>setShopIsOpen(false)}></div>
            <div className="shop-content">
                <h2>welcome!</h2>
                <p>flowers available: {props.count}</p>
                <div className="items">
                    {itemsForSale.map(item => <div className="item" key={item.id} name={item.cost} id={item.id}>
                        <h4>{item.title}</h4>
                        <p>cost: {item.cost}</p>
                        {props.count >= item.cost  ? <button onClick={()=>handlePurchase(item)}>buy</button> : <button disabled>buy</button>}
                    </div>)}
                </div>
            </div>
        </div>}
    </>)
}
export default Shop;