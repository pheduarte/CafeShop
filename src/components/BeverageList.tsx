import { useState, useEffect } from "react";
import { getBeverages } from "../api/beverages";
import type { Beverage } from "../types/beverages";
import BeverageCard from "../global/ui/BeverageCard";
import BeverageDetails from "./BeverageDetails";
import type { cartItems } from "../types/cart";
import { LoadingIndicator } from "../global/ui/LoadingIndicator";
import { CloseButton } from "../global/ui/closeButton";

export function BeverageList({
  setCartItems,
  quantity,
  setItemQuantity,
}: {
  setCartItems: React.Dispatch<React.SetStateAction<cartItems[]>>;
  setItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
}) {
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  // Function to handle showing beverage details
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(
    null,
  );

  useEffect(() => {
    async function loadBeverages() {
      try {
        const data = await getBeverages();
        setBeverages(data);
      } catch (err) {
        console.error("Error fetching beverages:", err);
        setError("Failed to load beverages. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadBeverages();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Function to handle adding a beverage to the cart
  function addToCart(beverage: Beverage) {
    setCartItems((currentItems) => [...currentItems, { beverage, quantity }]);
    setItemQuantity(1);
  }

  function showDetails(beverage: Beverage) {
    setSelectedBeverage(beverage);
  }

  function closeDetails() {
    setSelectedBeverage(null);
  }

  const icedBeverages = beverages.filter(
    (beverage) => beverage.type === "cold",
  );
  const hotBeverages = beverages.filter((beverage) => beverage.type === "hot");
  const specialBeverages = beverages.filter(
    (beverages) => beverages.type === "special",
  );

  return (
    <div>
      <section>
        <div className="beverage-list">
          <div>{hotBeverages.length > 0 && <h2>Hot Beverages</h2>}</div>
          {hotBeverages.map((beverage) => (
            <BeverageCard
              key={beverage.id}
              beverage={beverage}
              onShowDetails={showDetails}
            />
          ))}
          <div>{icedBeverages.length > 0 && <h2>Iced Beverages</h2>}</div>
          {icedBeverages.map((beverage) => (
            <BeverageCard
              key={beverage.id}
              beverage={beverage}
              onShowDetails={showDetails}
            />
          ))}
          <div>
            {specialBeverages.length > 0 && <h2>Specialty Beverages</h2>}
          </div>
          {specialBeverages.map((beverage) => (
            <BeverageCard
              key={beverage.id}
              beverage={beverage}
              onShowDetails={showDetails}
            />
          ))}
        </div>
      </section>

      {selectedBeverage && (
        <div className="beverage-details-overlay" onClick={closeDetails}>
          <div
            className="beverage-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="close-button-container">
              <CloseButton onCloseButton={closeDetails} />
            </div>
            <BeverageDetails
              beverage={selectedBeverage}
              onAddToCart={addToCart}
              closeDetails={closeDetails}
              quantity={quantity}
              setItemQuantity={setItemQuantity}
            />
          </div>
        </div>
      )}
    </div>
  );
}
