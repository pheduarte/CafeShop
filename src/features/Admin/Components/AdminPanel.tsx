import "./AdminPanel.scss";
import { IconMathGreater } from "@tabler/icons-react";
import { addToStock } from "../Helpers/addBeverageToStock";
import type { Beverage } from "../../../types/beverages";
import NewBeverageForm from "./NewBeverageForm";
import { useState } from "react";
import { CloseButton } from "../../../global/ui/closeButton";
import ManageUsers from "./ManageUsers";
import "../../../global/ui/cardOverlay.scss";

type AdminPanelProps = {
  closeAdminPanel: () => void;
};

function AdminPanel({ closeAdminPanel }: AdminPanelProps) {
  const [openAddNewBeverage, setOpenAddNewBeverage] = useState(false);
  const [openManageUsersCard, setOpenManagerUsersCard] = useState(false);

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

  function openManageUsers() {
    setOpenManagerUsersCard(true);
  }

  function closeManageUsers() {
    setOpenManagerUsersCard(false);
  }

  return (
    <>
      <div className="admin-card-header">
        <h2>Admin Panel</h2>
        <CloseButton onCloseButton={closeAdminPanel} />
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
          <button type="button" onClick={openManageUsers}>
            <IconMathGreater stroke={2} />
          </button>
        </div>
      </div>

      {openAddNewBeverage && (
        <div className="card-overlay" onClick={closeAddNewBeverageForm}>
          <div
            className={`card-modal ${openAddNewBeverage ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <NewBeverageForm
              addNewBeverage={addNewBeverage}
              closeForm={closeAddNewBeverageForm}
            />
          </div>
        </div>
      )}

      {openManageUsersCard && (
        <div className="card-overlay" onClick={closeManageUsers}>
          <div
            className={`card-modal ${openManageUsersCard ? "open" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <ManageUsers onCloseButton={closeManageUsers} />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;
