// theres no way u found this, lol, but hey if u did, u did.

// i've liked u for a while now, chelsey. i'm just scared shitless 
// i might end up fucking things up and losing a good friend, maybe even 2. 

// at the same time though, i feel like the risk is worth it.

// if u found this, i'd love to hang sometime. but just because u found
// this doesnt mean u have to tell me u did, though. it's hidden for a reason. :)

// dont trip, i'll be sure to make things exra awkward if u found this, lol.

// see ya chelsey.

import './App.css';
import { useState, useEffect } from "react";
import backdrop from './img/backdrop.png';
import Person from './Components/Person';
import Flower from './Components/Flower';
import Controls from './Components/Controls';
import PositionContext from './Context/PositionContext';
import FlowerContext from './Context/FlowerContext';
import Backpack from './Components/Backpack';
import Shop from './Components/Shop';
function App() {
  const [position,setPosition] = useState({
    x: 150,
    y: 450,
    dir: 'right',
    foot: true,
    rotate: 0,
    scale: 115
  });

  const [flowerPos,setFlowerPos] = useState({x:250,y:300,scale:70});
  
  const [flowerCount,setFlowerCount] = useState(0);

  const [backpack,setBackpack] = useState([]);

  const handlePurchase = (e) => {
    setFlowerCount(flowerCount - e.cost);
    setBackpack([...backpack,e]);
  }

  const checkSize = (x,y) => {
    if (y > 400) return setFlowerPos({x,y,scale:130});
    if (y > 300) return setFlowerPos({x,y,scale:100});
    if (y > 200) return setFlowerPos({x,y,scale:70});
  }

  useEffect(()=>{
    if (flowerPos.y > 400) {
      if ((position.x <= flowerPos.x - 20 && position.x >= flowerPos.x - 55) && (position.y <= flowerPos.y + 55 && position.y >= flowerPos.y + 25)) {
        const x = Math.floor(Math.random() * (320 - 10) + 10);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        setFlowerCount(flowerCount + 1);
      }
    }
    else if (flowerPos.y > 300) {
      if ((position.x <= flowerPos.x - 10 && position.x >= flowerPos.x - 26) && (position.y <= flowerPos.y + 60 && position.y >= flowerPos.y + 40)) {
        const x = Math.floor(Math.random() * (320 - 10) + 10);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        setFlowerCount(flowerCount + 1);
      }
    }
    else {
      if ((position.x <= flowerPos.x - 3 && position.x >= flowerPos.x - 15) && (position.y <= flowerPos.y + 58 && position.y >= flowerPos.y - 52)) {
        const x = Math.floor(Math.random() * (320 - 10) + 10);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        setFlowerCount(flowerCount + 1);
      }
    }
  },[position])

  return (<>
  <PositionContext.Provider value={{position,setPosition}}>
    <FlowerContext.Provider value={{flowerPos,setFlowerPos}}>
      <div className="backdrop-container">
        <img src={backdrop} alt="backdrop" className="backdrop" />
      </div>
      <div className="window">
        <div className="gamespace">
          <Person />
          <Flower count={flowerCount}/>
          <Shop count={flowerCount} purchase={e=>handlePurchase(e)} />
          <Backpack items={backpack} /> 
        </div>
      </div>
    </FlowerContext.Provider>
    <Controls />
  </PositionContext.Provider>
  </>);
}

export default App;
