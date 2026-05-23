import { IconMenu2 } from "@tabler/icons-react";
import { useDrawer } from "../hooks/useDrawer";

function Header() {
  const { openDrawer } = useDrawer();

  return (
    <header className="header">
      <IconMenu2 className="header-menu" stroke={2} onClick={openDrawer} />

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
