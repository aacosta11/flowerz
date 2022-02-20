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
import AdminPage from './Components/AdminPage';
import AdminContext from './Context/AdminContext';
function App() {
  const [isLogInOpen,setIsLogInOpen] = useState(true);
  const [isAdmin,setIsAdmin] = useState(false);

  const [position,setPosition] = useState({
    x: 150,
    y: 250,
    dir: 'right',
    foot: true,
    rotate: 0,
    scale: 115
  });

  const [flowerPos,setFlowerPos] = useState({x:250,y:250,scale:100,zIndex:8});
  
  const [flowerCount,setFlowerCount] = useState(0);

  const [backpack,setBackpack] = useState([]);

  const handlePurchase = (e) => {
    setFlowerCount(flowerCount - e.cost);
    setBackpack([...backpack,e]);
  }

  const checkSize = (x,y) => {
    let zIndex = y > position.y - 60 ? 10 : 8;
    if (y > 300) return setFlowerPos({x,y,scale:130,zIndex});
    if (y > 200) return setFlowerPos({x,y,scale:115,zIndex});
    return setFlowerPos({x,y,scale:100,zIndex});
  }

  useEffect(()=>{
    if (flowerPos.y > 300) {
      if ((position.x <= flowerPos.x - 15 && position.x >= flowerPos.x - 60) && (position.y <= flowerPos.y + 55 && position.y >= flowerPos.y + 25)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 20) + 20);
        const y = Math.floor(Math.random() * (320 - 130) + 130);
        checkSize(x,y);
      }
    }
    else if (flowerPos.y > 200) {
      if ((position.x <= flowerPos.x - 5 && position.x >= flowerPos.x - 50) && (position.y <= flowerPos.y + 60 && position.y >= flowerPos.y + 20)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 20) + 20);
        const y = Math.floor(Math.random() * (320 - 130) + 130);
        checkSize(x,y);
      }
    }
    else {
      if ((position.x <= flowerPos.x - 10 && position.x >= flowerPos.x - 50) && (position.y <= flowerPos.y + 70 && position.y >= flowerPos.y + 30)) {
        setFlowerCount(flowerCount + 1);
        const x = Math.floor(Math.random() * (320 - 20) + 20);
        const y = Math.floor(Math.random() * (320 - 130) + 130);
        checkSize(x,y);
      }
    }
  },[position])

  return (<>
  <LoginContext.Provider value={{isLogInOpen,setIsLogInOpen}} >
    <AdminContext.Provider value={{isAdmin,setIsAdmin}} >
      <Login />
      <AdminPage />
    </AdminContext.Provider>
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