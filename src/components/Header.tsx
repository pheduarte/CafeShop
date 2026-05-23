import { IconMenu2 } from "@tabler/icons-react";
import { useDrawer } from "../hooks/useDrawer";
import { useAuth } from "../hooks/useAuth";

function Header() {
  const { openDrawer } = useDrawer();
  const { user, isLoggedIn } = useAuth();

  return (
    <header className="header">
      <IconMenu2 className="header-menu" stroke={2} onClick={openDrawer} />
      <div>
        {isLoggedIn ? <h2>Welcome, {user?.name}</h2> : <h2>Welcome, guest</h2>}
      </div>

      <div className="header-title">
        <div className="drawer-title">
          <img
            src="/images/logo.jpeg"
            alt="Café Shop Logo"
            className="drawer-logo"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
