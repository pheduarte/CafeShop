import "./QuantityBtn.scss"
import { useState } from "react";

function QuantityBtn({ initialQuantity }: { initialQuantity?: number }) {

    const [quantity, setQuantity] = useState<number>(initialQuantity);

    return (
        <div className="quantity-container">
            <button className="add-btn" onClick={() => setQuantity(quantity + 1)}></button>
            <span className="quantity">{quantity}</span>
            <button className="subtract-btn" disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}></button>
        </div>
    )
}

export default QuantityBtn;