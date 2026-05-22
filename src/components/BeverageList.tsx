import { useState } from "react";
// import { getBeverages } from "../api/beverages";
import type { Beverage } from "../types/beverages";
import BeverageCard from "../ui/BeverageCard";
// import Header from "./Header";
import { allBeverages } from "../api/litsOfBeverages";
import BeverageDetails from "./BeverageDetails";

export function BeverageList({
  setCartItems,
}: {
  setCartItems: React.Dispatch<React.SetStateAction<Beverage[]>>;
}) {
  /* 
  // Uncomment the following code to fetch beverages from an API instead of using the hardcoded list. 
  // Make sure to implement the getBeverages function in your API file and adjust the import statement accordingly.
  //Delete allBeverages file when moving to API
  */
  // const [beverages, setBeverages] = useState<Beverage[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   async function loadBeverages() {
  //     try {
  //       const data = await getBeverages();
  //       setBeverages(data);
  //     } catch (err) {
  //       console.error("Error fetching beverages:", err);
  //       setError("Failed to load beverages. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadBeverages();
  // }, []);

  // if (loading) {
  //   return <p>Loading beverages...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // Function to handle adding a beverage to the cart
  function addToCart(beverage: Beverage) {
    setCartItems((currentItems) => [...currentItems, beverage]);
  }

  // Function to handle showing beverage details
  const [selectedBeverage, setSelectedBeverage] = useState<Beverage | null>(
    null,
  );

  function showDetails(beverage: Beverage) {
    setSelectedBeverage(beverage);
  }

  function closeDetails() {
    setSelectedBeverage(null);
  }

  // Change allBeverages to beverages when using the API fetching logic
  const icedBeverages = allBeverages.filter(
    (beverage) => beverage.type === "cold",
  );
  // Change allBeverages to beverages when using the API fetching logic
  const hotBeverages = allBeverages.filter(
    (beverage) => beverage.type === "hot",
  );
  // Change allBeverages to beverages when using the API fetching logic
  const specialBeverages = allBeverages.filter(
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
              <button className="close-button " onClick={closeDetails}>
                ×
              </button>
            </div>
            <BeverageDetails
              beverage={selectedBeverage}
              onAddToCart={addToCart}
              closeDetails={closeDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
}
