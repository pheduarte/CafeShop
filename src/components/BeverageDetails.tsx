import { QuantityBtn } from "../global/ui/QuantityBtn";
import React from "react";
import type { Beverage } from "../types/beverages";
import "./BeverageDetails.scss";

type BeverageDetailsProps = {
  beverage: Beverage;
  quantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  onAddToCart: (beverage: Beverage) => void;
  closeDetails: () => void;
};

function BeverageDetails({
  onAddToCart,
  closeDetails,
  setItemQuantity,
  beverage,
  quantity,
}: BeverageDetailsProps) {
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
          closeDetails();
        }}
      >
        <label> Special Instructions: </label>
        <textarea placeholder="e.g., no ice, extra hot, etc." />

        <div className="beverage-details-quantity-order">
          <QuantityBtn
            itemQuantity={quantity}
            setItemQuantity={setItemQuantity}
          />
          <button type="submit" className="add-to-cart-button">
            Add to Order
          </button>
        </div>
      </form>
    </section>
  );
}

export default BeverageDetails;
