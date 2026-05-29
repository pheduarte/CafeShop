import { useState } from "react";
import { CloseButton } from "../../../global/ui/closeButton";
import type { User } from "../../../types/user";
import { signUpUser } from "../../auth/services/signUpUser";
import "./EditUser.scss";

type EditUserProps = {
  closeForm: () => void;
};

type newUserProps = {
  user: User;
  password: string;
};

const userRoles: User["role"][] = ["customer", "admin", "barista"];

const initialFormData: newUserProps = {
  user: {
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "customer",
  },
  password: "",
};

function EditUser({ closeForm }: EditUserProps) {
  const [newUser, setNewUser] = useState<newUserProps>(initialFormData);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const createNewUser: newUserProps = {
      user: {
        name: newUser.user.name,
        lastName: newUser.user.lastName,
        email: newUser.user.email,
        mobile: newUser.user.mobile,
        role: newUser.user.role,
      },
      password: newUser.password,
    };

    signUpUser(createNewUser.user, createNewUser.password);

    setNewUser(initialFormData);
    closeForm();
  }

  function updateUserField<Field extends keyof User>(
    field: Field,
    value: User[Field],
  ) {
    setNewUser({
      ...newUser,
      user: {
        ...newUser.user,
        [field]: value,
      },
    });
  }

  return (
    <>
      <div className="card-header">
        <h3>Add a new user</h3>
        <CloseButton onCloseButton={closeForm} />
      </div>
      <form className="card-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          required
          value={newUser.user.name}
          onChange={(e) => updateUserField("name", e.target.value)}
        ></input>
        <label>Family Name:</label>
        <input
          type="text"
          required
          value={newUser.user.lastName}
          onChange={(e) => updateUserField("lastName", e.target.value)}
        ></input>
        <label>Email:</label>
        <input
          type="email"
          required
          value={newUser.user.email}
          onChange={(e) => updateUserField("email", e.target.value)}
        ></input>
        <label>Phone:</label>
        <input
          type="text"
          required
          value={newUser.user.mobile}
          onChange={(e) => updateUserField("mobile", e.target.value)}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          required
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        ></input>
        <label>Role:</label>
        <select
          required
          value={newUser.user.role}
          onChange={(e) =>
            updateUserField("role", e.target.value as User["role"])
          }
        >
          {userRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <div className="buttons">
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
}

export default EditUser;
