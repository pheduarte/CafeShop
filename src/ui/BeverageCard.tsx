import type { hotBeverage } from "../data/hotBeverage";

type BeverageCardProps = {
  beverage: hotBeverage;
  onAddToCart: (beverage: hotBeverage) => void;
};

function BeverageCard({ beverage, onAddToCart }: BeverageCardProps) {
  return (
    <div className="beverage-card">
      <div className="beverage-card-details">
        <h3 className="beverage-name">{beverage.name}</h3>
        <p className="beverage-description">{beverage.description}</p>
        <p className="beverage-price">${beverage.price.toFixed(2)}</p>
        <button className="add-to-cart-button" onClick={() => onAddToCart(beverage)}>
          Add to order
        </button>
      </div>
      <div className="beverage-image">
        <img src={beverage.image} alt={beverage.name} />
      </div>
    </div>
  );
}

export default BeverageCard;
