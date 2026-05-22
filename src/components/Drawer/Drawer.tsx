import { drawerNavigationItems } from "../../data/drawerItems";
import { useDrawer } from "../../hooks/useDrawer";
import { IconX } from "@tabler/icons-react";
import SignUp from "./SignUp";
import type { User } from "../../types/user";
import { useState } from "react";
import { IconMugFilled } from "@tabler/icons-react";
import StoreInfo from "./StoreInfo";

type DrawerProps = {
  user?: User;
  onSignUp: (user: User) => void;
};

export default function Drawer({ user, onSignUp }: DrawerProps) {
  const { isOpen, closeDrawer } = useDrawer();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
  }

  function openStoreInfo() {
    closeDrawer();
    setShowInfo(true);
  }

  function closeStoreInfo() {
    setShowInfo(false);
  }

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeDrawer} />}

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <div className="drawer-title">
            <IconMugFilled />
          </div>

          <IconX stroke={2} onClick={closeDrawer} />
        </div>

        <nav>
          {drawerNavigationItems.map((item) =>
            item.label === "Store info" ? (
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
          <button className="drawer-footer-button-login">Log in</button>
          <button className="drawer-footer-button-signup" onClick={openSignUp}>
            Sign up
          </button>
        </div>
      </aside>

      {showSignUp && (
        <div className="beverage-details-overlay" onClick={closeSignUp}>
          <div
            className="beverage-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="close-button-container">
              <button className="close-button " onClick={closeSignUp}>
                ×
              </button>
            </div>
            <SignUp user={user} onSignUp={handleSignUp} />
          </div>
        </div>
      )}

      {showInfo && (
        <div className="store-info-overlay" onClick={closeStoreInfo}>
          <div
            className={`store-info-modal ${showInfo ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="close-button-container">
              <button className="close-button " onClick={closeStoreInfo}>
                ×
              </button>
            </div>
            <StoreInfo />
          </div>
        </div>
      )}
    </>
  );
}
