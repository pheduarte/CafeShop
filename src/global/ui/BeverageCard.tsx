import type { Beverage } from "../../types/beverages";

type BeverageCardProps = {
  beverage: Beverage;
  onShowDetails?: (beverage: Beverage) => void;
};

function BeverageCard({ beverage, onShowDetails }: BeverageCardProps) {
  return (
    <div
      className="beverage-card"
      onClick={onShowDetails ? () => onShowDetails(beverage) : undefined}
    >
      <div className="beverage-card-details">
        <h3 className="beverage-name">{beverage.name}</h3>
        <p className="beverage-description">{beverage.description}</p>
        <p className="beverage-price">${beverage.price.toFixed(2)}</p>
      </div>
      <div className="beverage-image">
        <img src={beverage.image} alt={beverage.name} />
      </div>
    </div>
  );
}

export default BeverageCard;
