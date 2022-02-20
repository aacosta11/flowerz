import React, { useState, useEffect } from "react";
import axios from "axios";
import './Shop.css';
const Shop = props => {
    const [shopIsOpen,setShopIsOpen] = useState(false);

    const [itemsForSale,setItemsForSale] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/text`)
        .then(res => {
            console.log(res.data)
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
        console.log(e._id)
        props.purchase(e);
        let shopCopy = itemsForSale.filter(item => item._id !== e._id);
        console.log(shopCopy);
        setItemsForSale(shopCopy);
        return
    }

    return (<>
        <button className="shop" onClick={()=>setShopIsOpen(true)}>shop</button>
        {shopIsOpen && <div className="shop-overlay" >
            <div className="close-shop" onClick={()=>setShopIsOpen(false)}></div>
            <div className="shop-content">
                <h2>welcome!</h2>
                <p>flowers available: {props.count}</p>
                <div className="items">
                    {itemsForSale.map(item => <div className="item" key={item._id} name={item.cost} id={item._id}>
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