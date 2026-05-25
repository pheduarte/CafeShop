import { drawerNavigationItems } from "../../../data/drawerItems";
import { useDrawer } from "../../../hooks/useDrawer";
import { IconX } from "@tabler/icons-react";
import SignUp from "../../auth/components/SignUp";
import SignIn from "../../auth/components/SignIn";
import type { User } from "../../../types/user";
import { useState } from "react";
import StoreInfo from "../../../components/Drawer/StoreInfo";
import "../../../ui/cardOverlay.scss";
import "./drawer.scss";
import { useAuth } from "../../../hooks/useAuth";
import AdminPanel from "../../Admin/Components/AdminPanel";
import "../../Admin/Components/AdminPanel.scss";

type DrawerProps = {
  userName?: User;
  onSignUp: (user: User, password: string) => void;
  onSignIn: (user: User, password: string) => void;
};

export default function Drawer({ onSignUp, userName, onSignIn }: DrawerProps) {
  const { user, isLoggedIn, logout } = useAuth();

  const { isOpen, closeDrawer } = useDrawer();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  function openSignUp() {
    closeDrawer();
    setShowSignUp(true);
  }

  function closeSignUp() {
    setShowSignUp(false);
  }

  function handleSignUp(user: User, password: string) {
    closeSignUp();
    onSignUp(user, password);
  }

  function openSignIn() {
    closeDrawer();
    setShowSignIn(true);
  }

  function closeSignIn() {
    setShowSignIn(false);
  }

  function handleSignIn(user: User, password: string) {
    closeSignIn();
    onSignIn(user, password);
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

  function openAdminPanel() {
    closeDrawer();
    setShowAdminPanel(true);
  }

  function closeAdminPanel() {
    setShowAdminPanel(false);
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

        <nav>
          {drawerNavigationItems.map((item) => {
            // Hide Admin Panel for non-admin users
            if (item.label === "Admin Panel" && user?.role !== "admin") {
              return null;
            }

            // Admin Panel button
            if (item.label === "Admin Panel") {
              return (
                <button
                  key={item.id}
                  className="drawer-item"
                  onClick={openAdminPanel}
                >
                  {item.label}
                </button>
              );
            }

            // Store Information button
            if (item.label === "Store Information") {
              return (
                <button
                  key={item.id}
                  className="drawer-item"
                  onClick={openStoreInfo}
                >
                  {item.label}
                </button>
              );
            }

            // Default buttons
            return (
              <button key={item.id} className="drawer-item">
                {item.label}
              </button>
            );
          })}
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

      {showAdminPanel && (
        <div className="admin-overlay" onClick={closeAdminPanel}>
          <div className={`admin-modal ${showAdminPanel ? "open" : ""}`}>
            <AdminPanel closeAdminPanel={closeAdminPanel} />
          </div>
        </div>
      )}
    </>
  );
}
