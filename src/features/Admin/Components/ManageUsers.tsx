import { LoadingIndicator } from "../../../global/ui/LoadingIndicator";
import { CloseButton } from "../../../global/ui/closeButton";
import "./AdminPanel.scss";
import "./NewBeverageForm.scss";
import "./ManageUsers.scss";
import "../../../global/ui/cardOverlay.scss";
import type { User } from "../../../types/user";
import { getUsers } from "../../../api/users";
import { useState, useEffect } from "react";
import EditUser from "./EditUser";

type ManageUsersProps = {
  onCloseButton: () => void;
};

function ManageUsers({ onCloseButton }: ManageUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [createUserForm, setCreateUserForm] = useState(false);

  //   // Function to handle showing user details
  //   const [selectedUser, setSelectedUser] = useState<User | null>(
  //     null,
  //   );

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <section className="newBeverage-form-card">
        <header className="admin-card-header">
          <h2>Manage Users</h2>
          <CloseButton onCloseButton={onCloseButton} />
        </header>
        <div>
          <button
            className="new-user-btn"
            type="button"
            onClick={() => setCreateUserForm(true)}
          >
            Create new user
          </button>
        </div>
        <div>
          <table className="table-user-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Family Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id ?? user.email}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button type="button">Edit</button>
                  </td>
                  <td>
                    <button type="button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {createUserForm && (
        <section className="card-overlay" onClick={() => setCreateUserForm(false)}>
          <div className="card-modal open" onClick={(e) => e.stopPropagation()}>
            <EditUser closeForm={() => setCreateUserForm(false)} />
          </div>
        </section>
      )}
    </>
  );
}

export default ManageUsers;
