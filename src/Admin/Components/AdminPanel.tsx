import "./AdminPanel.scss";

type AdminPanelProps = {
  closeAdminPanel: () => void;
};

function AdminPanel({ closeAdminPanel }: AdminPanelProps) {
  return (
    <>
      <div className="admin-card-header">
        <h2>Admin Panel</h2>
        <button className="close-button" onClick={closeAdminPanel}>
          ×
        </button>
      </div>
      <div>
        <label>Add beverage to catalog</label>
        <button>Add</button>
      </div>
    </>
  );
}

export default AdminPanel;
