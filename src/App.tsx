
import './App.css';
import { useState } from 'react';
import { BeverageList } from './components/BeverageList';
import type { hotBeverage } from './data/hotBeverage';
import CartBar from './components/CartBar';


function App() {
 const [cartItems, setCartItems] = useState<hotBeverage[]>([]);

  return (
    <main className="App">
      <BeverageList setCartItems={setCartItems}/>
      <CartBar cartItems={cartItems}/>
      
    </main>
  )
}

export default App
