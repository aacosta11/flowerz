import './Person.css';
import React, { useEffect, useContext } from "react";
import right1 from '../img/right-1.png';
import right2 from '../img/right-2.png';
import left1 from "../img/left-1.png";
import left2 from "../img/left-2.png";
import up1 from '../img/up-1.png';
import up2 from '../img/up-2.png';
import PositionContext from "../Context/PositionContext";
const Person = props => {
    const {position} = useContext(PositionContext);

    const variations = {
        right1: right1,
        right2: right2,
        left1: left1,
        left2: left2,
        up1: up1,
        up2: up2
    }


    const personPosition = {
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `scale(${position.scale}%)`
    }

    return (<>
        <div className="personbox" style={{...personPosition}}>
            {position.foot ? 
            <img src={variations[`${position.dir}1`]} alt="person" style={{'transform':'rotate(15deg)'}} /> 
            : 
            <img src={variations[`${position.dir}2`]} alt="person" style={{'transform':'rotate(-15deg)'}} />}
            
        </div>
    </>)
}

export default Person;