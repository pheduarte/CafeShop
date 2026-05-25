import "./AdminPanel.scss";
import { IconMathGreater } from "@tabler/icons-react";
import { addToStock } from "../Helpers/addBeverageToStock";
import type { Beverage } from "../../types/beverages";
import { allBeverages } from "../../api/litsOfBeverages";

type AdminPanelProps = {
  closeAdminPanel: () => void;
};

function AdminPanel({ closeAdminPanel }: AdminPanelProps) {

  function addBebida(list: Beverage[]) {
    addToStock(list);
  }

  return (
    <>
      <div className="admin-card-header">
        <h2>Admin Panel</h2>
        <button className="close-button" onClick={closeAdminPanel}>
          ×
        </button>
      </div>
      <div className="admin-function-list">
        <div className="admin-function-items">
          <p>Add beverage to catalog</p>

          <button>
            <IconMathGreater stroke={2} />
          </button>
        </div>
        <div className="admin-function-items">
          <p>Manage Users</p>
          <button>
            <IconMathGreater stroke={2} />
          </button>
        </div>
        <div className="admin-function-items">
          <p>Add Bebida</p>
          <button onClick={() => addBebida(allBeverages)}>
            <IconMathGreater stroke={2} />
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
