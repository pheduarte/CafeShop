import Home from "./Home";
import Checkout from "./Checkout";
import { useState } from "react";

export type NavigationPages = "home" | "cart" | "checkout";

type NavigationProps = {
  navigation: NavigationPages;
};

function Navigation({ navigation }: NavigationProps) {
  const [currentPage, setCurrentPage] = useState<NavigationPages>(navigation);

  return (
    <div>
      {currentPage === "home" && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === "checkout" && (
        <Checkout setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default Navigation;
