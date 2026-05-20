import type { Beverage } from "../types/beverages";

type BeverageDetailsProps = {
  beverage: Beverage;
  onAddToCart: (beverage: Beverage) => void;
};

function BeverageDetails({ beverage, onAddToCart }: BeverageDetailsProps) {
  return (
    <section className="beverage-details">
      <div>
        <img
          src={beverage.image}
          alt={beverage.name}
          className="beverage-details-image"
        />
        <h3 className="beverage-name">{beverage.name}</h3>
        <p className="beverage-description">{beverage.description}</p>
        <p className="beverage-price">${beverage.price.toFixed(2)}</p>
      </div>
      <form
        className="beverage-details-instructions"
        onSubmit={(e) => {
          e.preventDefault();
          onAddToCart(beverage);
        }}
      >
        <label> Special Instructions: </label>
        <textarea placeholder="e.g., no ice, extra hot, etc." />
        <button type="submit" className="add-to-cart-button">
          Add to Order
        </button>
      </form>
    </section>
  );
}

export default BeverageDetails;
