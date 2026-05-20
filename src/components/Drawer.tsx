import { navigationItems } from "../data/navigation";
import { useDrawer } from "../hooks/useDrawer";
import { IconX } from "@tabler/icons-react";

export default function Drawer() {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeDrawer} />}

      <aside className={`drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Café Shop</h2>

          <IconX stroke={2} onClick={closeDrawer} />
        </div>

        <nav>
          {navigationItems.map((item) => (
            <button key={item.id} className="drawer-item">
              {item.label}
            </button>
          ))}
        </nav>

        <div className="drawer-footer">
          <button className="drawer-footer-button-login" >Log in</button>
          <button className="drawer-footer-button-signup">Sign up</button>
        </div>
      </aside>
    </>
  );
}
