import BeverageCard from "../ui/BeverageCard";
import type { hotBeverage } from "../data/hotBeverage";
import { allBeverages } from "../data/listOfAllBeverage";


export function BeverageList({
  setCartItems,
}: {
  setCartItems: React.Dispatch<React.SetStateAction<hotBeverage[]>>;
}) {
  
    // Function to handle adding a beverage to the cart
    function addToCart(beverage: hotBeverage) {
    setCartItems((currentItems) => [...currentItems, beverage]);
  }

  return (
    <div>
      <div className="beverage-list">
        {allBeverages.map((beverage, index) => (
          <BeverageCard
            key={index}
            beverage={beverage}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
