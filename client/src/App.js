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
import Logout from './Components/Logout';
import Login from './Components/Login';
import LoginContext from './Context/LoginContext';
function App() {
  const [isLogInOpen,setIsLogInOpen] = useState(true);

  const [position,setPosition] = useState({
    x: 150,
    y: 450,
    dir: 'right',
    foot: true,
    rotate: 0,
    scale: 115
  });

  const [flowerPos,setFlowerPos] = useState({x:250,y:300,scale:70,zIndex:8});
  
  const [flowerCount,setFlowerCount] = useState(0);

  const [backpack,setBackpack] = useState([]);

  const handlePurchase = (e) => {
    sessionStorage.setItem('flowers',flowerCount - 1);
    setFlowerCount(flowerCount - e.cost);
    setBackpack([...backpack,e]);
  }

  const checkSize = (x,y) => {
    let zIndex = y > position.y ? 10 : 8;
    console.log(position.y,y)
    if (y > 400) return setFlowerPos({x,y,scale:130,zIndex});
    if (y > 300) return setFlowerPos({x,y,scale:100,zIndex});
    if (y > 200) return setFlowerPos({x,y,scale:70,zIndex});
  }

  useEffect(()=>{
    if (flowerPos.y > 400) {
      if ((position.x <= flowerPos.x - 20 && position.x >= flowerPos.x - 55) && (position.y <= flowerPos.y + 55 && position.y >= flowerPos.y + 25)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 15) + 15);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        sessionStorage.setItem('flowers',flowerCount + 1);
      }
    }
    else if (flowerPos.y > 300) {
      if ((position.x <= flowerPos.x - 10 && position.x >= flowerPos.x - 26) && (position.y <= flowerPos.y + 60 && position.y >= flowerPos.y + 40)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 15) + 15);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        sessionStorage.setItem('flowers',flowerCount + 1);
      }
    }
    else {
      if ((position.x <= flowerPos.x - 3 && position.x >= flowerPos.x - 15) && (position.y <= flowerPos.y + 58 && position.y >= flowerPos.y - 52)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 15) + 15);
        const y = Math.floor(Math.random() * (520 - 320) + 320);
        checkSize(x,y);
        sessionStorage.setItem('flowers',flowerCount + 1);
      }
    }
  },[position])

  return (<>
  <LoginContext.Provider value={{isLogInOpen,setIsLogInOpen}} >
    <Login />
    <PositionContext.Provider value={{position,setPosition}} >
      <FlowerContext.Provider value={{flowerPos,setFlowerPos}} >
        <div className="backdrop-container">
          <img src={backdrop} alt="backdrop" className="backdrop" />
        </div>
        <div className="window">
          <div className="gamespace">
            <Person />
            <Flower count={flowerCount} />
            <Shop count={flowerCount} purchase={e=>handlePurchase(e)} />
            <Backpack items={backpack} /> 
            <Logout />
          </div>
        </div>
      </FlowerContext.Provider>
      <Controls />
    </PositionContext.Provider>
  </LoginContext.Provider>
  </>);
}

export default App;