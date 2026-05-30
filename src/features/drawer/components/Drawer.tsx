import { drawerNavigationItems } from "../../../data/drawerItems";
import { useDrawer } from "../../../hooks/useDrawer";
import SignUp from "../../auth/components/SignUp";
import SignIn from "../../auth/components/SignIn";
import type { User } from "../../../types/user";
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
import "../../Profile/Profile.scss";
import { useDisclosure } from "../../../hooks/useDisclosure";
import { Modal } from "../../../global/components/Modal";

type DrawerProps = {
  onSignUp: (user: User, password: string) => Promise<void>;
  onSignIn: (user: User, password: string) => void;
};

export default function Drawer({ onSignUp, onSignIn }: DrawerProps) {
  const { user, isLoggedIn, logout } = useAuth();

  const { isOpen, closeDrawer } = useDrawer();

  const signUp = useDisclosure();
  const signIn = useDisclosure();
  const storeInfo = useDisclosure();
  const adminPanel = useDisclosure();
  const baristaPanel = useDisclosure();
  const profilePanel = useDisclosure();

  function openSignUp() {
    closeDrawer();
    signUp.open();
  }

  async function handleSignUp(user: User, password: string) {
    try {
      await onSignUp(user, password);
      signUp.close();
    } catch {
      signUp.open();
    }
  }

  function openSignIn() {
    closeDrawer();
    signIn.open();
  }

  function handleSignIn(user: User, password: string) {
    signIn.close();
    onSignIn(user, password);
  }

  function openStoreInfo() {
    closeDrawer();
    storeInfo.open();
  }

  function handleLogout() {
    logout();
    closeDrawer();
  }

  function openAdminPanel() {
    closeDrawer();
    adminPanel.open();
  }

  function openBaristaPanel() {
    closeDrawer();
    baristaPanel.open();
  }

  function openProfile() {
    closeDrawer();
    profilePanel.open();
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

      <Modal isOpen={signUp.isOpen} onClose={signUp.close}>
        <SignUp onSignUp={handleSignUp} closeSignUp={signUp.close} />
      </Modal>

      <Modal isOpen={signIn.isOpen} onClose={signIn.close}>
        <SignIn onSignIn={handleSignIn} closeSignIn={signIn.close} />
      </Modal>

      <Modal
        isOpen={storeInfo.isOpen}
        onClose={storeInfo.close}
        overlayClassName="store-info-overlay"
        modalClassName="store-info-modal"
      >
        <StoreInfo closeInfo={storeInfo.close} />
      </Modal>

      <Modal
        isOpen={adminPanel.isOpen}
        onClose={adminPanel.close}
        overlayClassName="admin-overlay"
        modalClassName="admin-modal"
      >
        <AdminPanel closeAdminPanel={adminPanel.close} />
      </Modal>

      <Modal
        isOpen={baristaPanel.isOpen}
        onClose={baristaPanel.close}
        overlayClassName="barista-overlay"
        modalClassName="barista-modal"
      >
        <Barista closeBaristaPanel={baristaPanel.close} />
      </Modal>

      <Modal
        isOpen={profilePanel.isOpen}
        onClose={profilePanel.close}
        overlayClassName="profile-overlay"
        modalClassName="profile-modal"
      >
        <Profile onCloseButton={profilePanel.close} />
      </Modal>
    </>
  );
}
