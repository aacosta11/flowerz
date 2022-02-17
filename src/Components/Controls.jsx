import React, { useContext, useState } from "react";
import PositionContext from "../Context/PositionContext";
import './Controls.css';
const Controls = props => {
    const {position,setPosition} = useContext(PositionContext);
    const [lastXDir,setLastXDir] = useState('right');

    const handleControlInput = (e) => {
        if (e.attributes.name.value === 'left') {setLastXDir('left');}
        else if ((e.attributes.name.value === 'right')) {setLastXDir('right');}

        if(e.attributes.name.value === 'left' && position.x > 5) {
            setPosition({
                ...position,
                x: position.x - 13,
                dir: 'left',
                foot: !position.foot
            })
        }
        else if(e.attributes.name.value === 'right' && position.x < 330) {
            setPosition({
                ...position,
                x: position.x + 13,
                dir: 'right',
                foot: !position.foot
            })
        }
        else if(e.attributes.name.value === 'up' && position.y > 330){
            setPosition({
                ...position,
                y: position.y - 8,
                dir: 'up',
                foot: !position.foot,
                scale: position.scale - 4
            })
        }
        else if(e.attributes.name.value === 'down' && position.y < 540){
            setPosition({
                ...position,
                y: position.y + 8,
                dir: lastXDir,
                foot: !position.foot,
                scale: position.scale + 4
            })
        }
    }


    return (<>
        <div className="container">
            <div className="controls">
                <div className="section">
                    <div className="temparrowbox" id="left" onClick={e=>handleControlInput(e.target)} name="left" ></div>
                </div>
                <div className="section middle">
                    <div className="temparrowbox" id="up" onClick={e=>handleControlInput(e.target)} name="up" ></div>
                    <div className="temparrowbox" id="down" onClick={e=>handleControlInput(e.target)} name="down" ></div>
                </div>
                <div className="section">
                    <div className="temparrowbox" id="right" onClick={e=>handleControlInput(e.target)} name="right" ></div>
                </div>
            </div>
        </div>
    </>)
}

export default Controls;