import type React from "react";
import "./QuantityBtn.scss";

type QuantityProps = {
  itemQuantity: number;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export function QuantityBtn({ itemQuantity, setItemQuantity }: QuantityProps) {
  return (
    <div className="quantity-container">
      <button
        type="button"
        className="subtract-btn"
        disabled={itemQuantity === 1}
        onClick={() => setItemQuantity(itemQuantity - 1)}
      >
        -
      </button>

      <span className="quantity">{itemQuantity}</span>
      <button
        type="button"
        className="add-btn"
        onClick={() => setItemQuantity(itemQuantity + 1)}
      >
        +
      </button>
    </div>
  );
}
