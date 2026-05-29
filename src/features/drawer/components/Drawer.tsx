import { drawerNavigationItems } from "../../../data/drawerItems";
import { useDrawer } from "../../../hooks/useDrawer";
import SignUp from "../../auth/components/SignUp";
import SignIn from "../../auth/components/SignIn";
import type { User } from "../../../types/user";
import { useState } from "react";
import StoreInfo from "./StoreInfo";
import "../../../global/ui/cardOverlay.scss";
import "./drawer.scss";
import { useAuth } from "../../../hooks/useAuth";
import AdminPanel from "../../Admin/Components/AdminPanel";
import "../../Admin/Components/AdminPanel.scss";
import "../../Barista/components/Barista.scss";
import Barista from "../../Barista/components/Barista";
import { CloseButton } from "../../../global/ui/closeButton";
import Profile from "../../Profile/Profile";

type DrawerProps = {
  onSignUp: (user: User, password: string) => Promise<void>;
  onSignIn: (user: User, password: string) => void;
};

export default function Drawer({ onSignUp, onSignIn }: DrawerProps) {
  const { user, isLoggedIn, logout } = useAuth();

  const { isOpen, closeDrawer } = useDrawer();

  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showBaristaPanel, setShowBaristaPanel] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  function openSignUp() {
    closeDrawer();
    setShowSignUp(true);
  }

  function closeSignUp() {
    setShowSignUp(false);
  }

  async function handleSignUp(user: User, password: string) {
    try {
      await onSignUp(user, password);
      closeSignUp();
    } catch {
      setShowSignUp(true);
    }
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

  function openBaristaPanel() {
    closeDrawer();
    setShowBaristaPanel(true);
  }

  function closeBaristaPanel() {
    setShowBaristaPanel(false);
  }

  function openProfile() {
    setShowProfile(true);
  }

  function closeProfile() {
    setShowProfile(false);
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
          <CloseButton onCloseButton={closeDrawer} />
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

            if (
              item.label === "Barista Panel" &&
              user?.role !== "admin" &&
              user?.role !== "barista"
            ) {
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

            if (item.label === "Barista Panel") {
              return (
                <button
                  key={item.id}
                  className="drawer-item"
                  onClick={openBaristaPanel}
                >
                  {item.label}
                </button>
              );
            }

            if (item.label === "Profile") {
              return (
                <button
                  key={item.id}
                  className="drawer-item"
                  onClick={openProfile}
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
            <SignUp onSignUp={handleSignUp} closeSignUp={closeSignUp} />
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
          <div
            className={`admin-modal ${showAdminPanel ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <AdminPanel closeAdminPanel={closeAdminPanel} />
          </div>
        </div>
      )}

      {showBaristaPanel && (
        <div className="barista-overlay" onClick={closeBaristaPanel}>
          <div
            className={`barista-modal ${showBaristaPanel ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <Barista closeBaristaPanel={closeBaristaPanel} />
          </div>
        </div>
      )}

      {showProfile && (
        <div className="card-overlay" onClick={closeProfile}>
          <div
            className={`card-modal ${showProfile ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <Profile onCloseButton={closeProfile} />
          </div>
        </div>
      )}
    </>
  );
}
