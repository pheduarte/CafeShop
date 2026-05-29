import { LoadingIndicator } from "../../../global/ui/LoadingIndicator";
import { CloseButton } from "../../../global/ui/closeButton";
import "./AdminPanel.scss";
import "./NewBeverageForm.scss";
import type { User } from "../../../types/user";
import { getUsers } from "../../../api/users";
import { useState, useEffect } from "react";

type ManageUsersProps = {
  onCloseButton: () => void;
};

function ManageUsers({ onCloseButton }: ManageUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

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

  const barista = users.filter((user) => user.role === "barista");
  const admin = users.filter((user) => user.role === "admin");

  return (
    <>
      <section className="newBeverage-form-card">
        <header className="admin-card-header">
          <h2>Manage Users</h2>
          <CloseButton onCloseButton={onCloseButton} />
        </header>
        <div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3>Barista:</h3>
            <ul>
              {barista.map((user) => (
                <li key={user.id}>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Admin:</h3>
            <ul>
              {admin.map((user) => (
                <li key={user.id}>
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageUsers;
