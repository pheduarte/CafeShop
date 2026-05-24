import { drawerNavigationItems } from "../../data/drawerItems";
import { useDrawer } from "../../hooks/useDrawer";
import { IconX } from "@tabler/icons-react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import type { User } from "../../types/user";
import { useState } from "react";
import StoreInfo from "./StoreInfo";
import "../../ui/cardOverlay.scss";
import "./drawer.scss";
import { useAuth } from "../../hooks/useAuth";
import type { Beverage } from "../../types/beverages";
import { addDocsToFirebase } from "../../firestore/addBeverageToCatalog";

import { db } from "../../firestore/firebase-config";
import { auth } from "../../firestore/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type DrawerProps = {
  userName?: User;
  onSignUp: (user: User) => void;
  onSignIn: (user: User) => void;
};

export default function Drawer({ onSignUp, userName, onSignIn }: DrawerProps) {
  const { user, isLoggedIn, logout } = useAuth();

  const { isOpen, closeDrawer } = useDrawer();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const beverageStock: Beverage[] = [
  {
    name: "Babyccino",
    description:
      "A frothy, steamed milk beverage for kids, often topped with a sprinkle of cocoa or cinnamon.",
    price: 2.5,
    image: "/images/babyccino.webp",
    type: "hot",
  },
  {
    name: "Cappuccino",
    description:
      "Fluffy steamed milk, a shot of espresso, and a dusting of cocoa. A classic Italian delight.",
    price: 4.7,
    image: "/images/cappuccino.webp",
    type: "hot",
  },
  {
    name: "Chai Latte",
    description: "Warming spices and creamy goodness. Like a hug in a mug.",
    price: 5.5,
    image: "/images/chailatte.webp",
    type: "hot",
  },
  {
    name: "Hot Chocolate",
    description: "Silky, rich, and deeply chocolatey. Pure comfort in a cup.",
    price: 5.5,
    image: "/images/hotchocolate.webp",
    type: "hot",
  },
  {
    name: "Flat White",
    description: "Smooth, creamy, and just the right amount of coffee kick.",
    price: 4.7,
    image: "/images/flatwhite.webp",
    type: "hot",
  },
  {
    name: "Iced chocolate",
    description: "Chilled, creamy, and decadently chocolatey.",
    price: 7.0,
    image: "/images/icedchocolate.webp",
    type: "cold",
  },
  {
    name: "Iced Latte",
    description: "Smooth espresso, chilled milk, and a touch of sweetness.",
    price: 7.0,
    image: "/images/icedlatte.webp",
    type: "cold",
  },
  {
    name: "Cold Brew",
    description: "Bold, smooth, and refreshingly cold. A coffee lover's dream.",
    price: 8.0,
    image: "/images/coldbrew.webp",
    type: "special",
  },
  {
    name: "Batch Brew",
    description:
      "A large batch of smooth, balanced coffee, brewed to perfection.",
    price: 6.0,
    image: "/images/batchbrew.webp",
    type: "hot",
  },
  {
    name: "Latte",
    description: "Creamy, smooth, and perfectly balanced. A timeless classic.",
    price: 4.5,
    image: "/images/latte.webp",
    type: "hot",
  },
  {
    name: "Long Black",
    description:
      "Bold, intense, and full of flavor. A true coffee lover's choice.",
    price: 4.0,
    image: "/images/longblack.webp",
    type: "hot",
  },
  {
    name: "Macchiato",
    description:
      "Espresso with a dollop of frothy milk. A perfect balance of strong and smooth.",
    price: 4.5,
    image: "/images/macchiato.webp",
    type: "hot",
  },
  {
    name: "Matcha Latte",
    description:
      "Vibrant green tea blended with creamy milk. A refreshing and energizing treat.",
    price: 5.0,
    image: "/images/matchalatte.webp",
    type: "hot",
  },
  {
    name: "Mocha",
    description:
      "A delicious blend of espresso, chocolate, and steamed milk. A sweet indulgence.",
    price: 5.5,
    image: "/images/mocha.webp",
    type: "hot",
  },
  {
    name: "Piccolo",
    description:
      "Espresso with a small amount of steamed milk. A concentrated burst of flavor.",
    price: 4.0,
    image: "/images/piccolo.webp",
    type: "hot",
  },
  {
    name: "Pumpkin Spice Latte",
    description:
      "A seasonal favorite, blending espresso with pumpkin, spices, and creamy milk.",
    price: 5.5,
    image: "/images/pumpkinlatte.webp",
    type: "hot",
  },
  {
    name: "Taro Latte",
    description:
      "A sweet and creamy blend of taro root and milk, with a subtle nutty flavor.",
    price: 5.0,
    image: "/images/tarolatte.webp",
    type: "hot",
  },
  {
    name: "Turmeric Latte",
    description:
      "A warm and earthy blend of turmeric, spices, and creamy milk. A golden delight.",
    price: 5.0,
    image: "/images/turmericlatte.webp",
    type: "hot",
  },
];

  function addToStock() {
    addDocsToFirebase(beverageStock);
  }

  function createUserOnFirebase(user: User) {
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (Response) => {
        const userid = Response.user.uid;
        setTimeout(() => {}, 3000);
        try {
          await setDoc(doc(db, "users", userid), {
            userName: user.name,
            lastName: user.lastName,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
          });
        } catch (e) {
          console.log("Error adding document: ", e);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function openSignUp() {
    closeDrawer();
    setShowSignUp(true);
  }

  function closeSignUp() {
    setShowSignUp(false);
  }

  function handleSignUp(user: User) {
    closeSignUp();
    onSignUp(user);
    createUserOnFirebase(user);
  }

  function openSignIn() {
    closeDrawer();
    setShowSignIn(true);
  }

  function closeSignIn() {
    setShowSignIn(false);
  }

  function handleSignIn(user: User) {
    closeSignIn();
    onSignIn(user);
  }

  function openStoreInfo() {
    closeDrawer();
    setShowInfo(true);
  }

  function closeStoreInfo() {
    setShowInfo(false);
  }

  function handleLogout() {
    logout();
    closeDrawer();
  }

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeDrawer} />}

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-title">
            <img
              src="/images/logo.jpeg"
              alt="Café Shop Logo"
              className="drawer-logo"
            />
          </div>

          <IconX stroke={2} onClick={closeDrawer} />
        </div>

        <div className="drawer-logged-user-title">
          {isLoggedIn ? (
            <h3>Welcome, {user?.name}</h3>
          ) : (
            <h3>Welcome, guest</h3>
          )}
        </div>

        <button onClick={addToStock}>Add</button>

        <nav>
          {drawerNavigationItems.map((item) =>
            item.label === "Store Information" ? (
              <button
                key={item.id}
                className="drawer-item"
                onClick={openStoreInfo}
              >
                {item.label}
              </button>
            ) : (
              <button key={item.id} className="drawer-item">
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="drawer-footer">
          {isLoggedIn ? (
            <button
              className="drawer-footer-button-login"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="drawer-footer-button-login"
                onClick={openSignIn}
              >
                Log in
              </button>

              <button
                className="drawer-footer-button-signup"
                onClick={openSignUp}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </aside>

      {showSignUp && (
        <div className="card-overlay" onClick={closeSignUp}>
          <div
            className="card-modal open"
            onClick={(event) => event.stopPropagation()}
          >
            {/* <div className="close-button-container">
              <button className="close-button " onClick={closeSignUp}>
                ×
              </button>
            </div> */}
            <SignUp
              user={userName}
              onSignUp={handleSignUp}
              closeSignUp={closeSignUp}
            />
          </div>
        </div>
      )}

      {showSignIn && (
        <div className="card-overlay" onClick={closeSignIn}>
          <div
            className="card-modal open"
            onClick={(event) => event.stopPropagation()}
          >
            <SignIn onSignIn={handleSignIn} closeSignIn={closeSignIn} />
          </div>
        </div>
      )}

      {showInfo && (
        <div className="store-info-overlay" onClick={closeStoreInfo}>
          <div
            className={`store-info-modal ${showInfo ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <StoreInfo closeInfo={closeStoreInfo} />
          </div>
        </div>
      )}
    </>
  );
}
