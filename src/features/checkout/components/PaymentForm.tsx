import type { FormEvent } from "react";
import { useState } from "react";

type PaymentFormProps = {
  onCloseCheckout: () => void;
  onHandlePay: () => Promise<void>;
};

function PaymentForm({ onCloseCheckout, onHandlePay }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    setIsProcessing(true);

    try {
      await onHandlePay();
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Name on card:
          <input type="text" name="name" required disabled={isProcessing} />
        </label>

        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            required
            disabled={isProcessing}
          />
        </label>

        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            required
            disabled={isProcessing}
          />
        </label>

        <label>
          CVV:
          <input type="text" name="cvv" required disabled={isProcessing} />
        </label>

        <div className="checkout-btn-container">
          <button
            type="button"
            className="cancel-button"
            onClick={onCloseCheckout}
            disabled={isProcessing}
          >
            Cancel
          </button>

          <button type="submit" className="submit-button" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
