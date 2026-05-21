import { IconMenu2, IconMugFilled } from "@tabler/icons-react";
import { useDrawer } from "../hooks/useDrawer";

function Header() {
  const { openDrawer } = useDrawer();

  return (
    <header className="header">
      <IconMenu2 className="header-menu" stroke={2} onClick={openDrawer} />
      <div className="header-title">
        <h1>Café Shop</h1>
        <IconMugFilled />
      </div>
    </header>
  );
}

export default Header;
