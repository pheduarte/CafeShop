import "./AdminPanel.scss";
import { IconMathGreater } from "@tabler/icons-react";
import { addToStock } from "../Helpers/addBeverageToStock";
import type { Beverage } from "../../../types/beverages";
import NewBeverageForm from "./NewBeverageForm";
import { useState } from "react";

type AdminPanelProps = {
  closeAdminPanel: () => void;
};

function AdminPanel({ closeAdminPanel }: AdminPanelProps) {
  const [openAddNewBeverage, setOpenAddNewBeverage] = useState(false);

  //Get data from new beverage form
  function addNewBeverage(list: Beverage) {
    addToStock(list);
  }

  function openAddNewBeverageForm() {
    setOpenAddNewBeverage(true);
  }

  function closeAddNewBeverageForm() {
    setOpenAddNewBeverage(false);
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

          <button onClick={openAddNewBeverageForm}>
            <IconMathGreater stroke={2} />
          </button>
        </div>
        <div className="admin-function-items">
          <p>Manage Users</p>
          <button>
            <IconMathGreater stroke={2} />
          </button>
        </div>
      </div>

      {openAddNewBeverage && (
        <div className="admin-overlay" onClick={closeAddNewBeverageForm}>
          <div
            className={`admin-modal ${openAddNewBeverage ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <NewBeverageForm addNewBeverage={addNewBeverage} closeForm={closeAddNewBeverageForm}/>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;
