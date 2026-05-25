import "./signup.scss";
import "../../../ui/cardOverlay.scss";
import { useState } from "react";
import type { User } from "../../../types/user";

type SignUpProps = {
  user?: User;
  onSignUp: (user: User, password: string) => void;
  closeSignUp: () => void;
};

function SignUp({ onSignUp, closeSignUp }: SignUpProps) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  return (
    <section className="signup-details">
      <div className="close-button-container">
        <div>
          <h2>Create account</h2>
        </div>
        <button className="close-button" onClick={closeSignUp}>
          ×
        </button>
      </div>
      <form
        className="user-details-signup"
        onSubmit={(e) => {
          e.preventDefault();

          const newUser: User = {
            id: "",
            name: formData.name,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            role: "customer" as const,
          };
          onSignUp(newUser, formData.password);
        }}
      >
        <label> Email: </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label> First Name: </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label> Last Name: </label>
        <input
          type="text"
          required
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label> Mobile: </label>
        <input
          type="text"
          required
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
        <label> Password: </label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit" className="signup-button">
          Continue
        </button>
      </form>
    </section>
  );
}

export default SignUp;
