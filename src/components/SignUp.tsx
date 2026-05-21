import { useState } from "react";
import type { User } from "../types/user";

type SignUpProps = {
  user?: User;
  onSignUp: (user: User) => void;
};

function SignUp({ user, onSignUp }: SignUpProps) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  }); 

  return (
    <section className="signup-details">
      <div>
        <h2>Create an account</h2>
      </div>
      <form
        className="user-details-signup"
        onSubmit={(e) => {
          e.preventDefault();

          const newUser: User = {
            id: user?.id ?? crypto.randomUUID(),
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            role: "customer",
          };
          onSignUp(newUser);
        }}
      >
        <label> First Name: </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label> Last Name: </label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label> Email: </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label> Mobile: </label>
        <input
          type="text"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <label> Password: </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit" className="submit-newuser-button">
          Sign Up
        </button>
      </form>
    </section>
  );
}

export default SignUp;
