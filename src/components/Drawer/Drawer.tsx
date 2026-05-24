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
    onSignIn(user)
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
