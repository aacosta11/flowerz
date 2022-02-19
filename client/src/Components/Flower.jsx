import React, { useContext } from "react";
import FlowerContext from "../Context/FlowerContext";
import flower from '../img/flour.png';
import './Flower.css';
const Flower = props => {
    const {flowerPos,setFlowerPos} = useContext(FlowerContext);

    const flowerPosition = {
        top: `${flowerPos.y}px`,
        left: `${flowerPos.x}px`,
        transform: `scale(${flowerPos.scale}%)`,
        zIndex: flowerPos.zIndex
    }

    return (<>
        <div className="flower-count">
            <h3>flours: x{props.count}</h3>
        </div>
        <div className="flower" style={{...flowerPosition}}>
            <img src={flower} alt="flower" />
        </div>
    </>)
}

export default Flower;