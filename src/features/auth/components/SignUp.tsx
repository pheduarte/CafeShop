import "./signup.scss";
import "../../../global/ui/cardOverlay.scss";
import { useState } from "react";
import type { User } from "../../../types/user";
import { isPhoneValid } from "../helper/phoneValidation";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type SignUpProps = {
  onSignUp: (user: User, password: string) => void;
  closeSignUp: () => void;
};

function SignUp({ onSignUp, closeSignUp }: SignUpProps) {
  const [phoneError, setPhoneError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  return (
    <section className="signup-details">
      <div className="signup-modal">
        <div className="close-button-container-signup">
          <div>
            <h2>Create account</h2>
          </div>
          <button
            type="button"
            className="close-button"
            onClick={closeSignUp}
            aria-label="Close sign up"
          >
            ×
          </button>
        </div>

        <form
          className="user-details-signup"
          onSubmit={(e) => {
            e.preventDefault();

            if (!isPhoneValid(formData.mobile)) {
              setPhoneError("Please enter a valid mobile number.");
              return;
            }

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
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
          <label htmlFor="mobile"> Mobile: </label>
          <PhoneInput
            className="phone-input"
            inputProps={{ id: "mobile", required: true }}
            defaultCountry="au"
            value={formData.mobile}
            onChange={(mobile) => {
              setFormData({ ...formData, mobile });
              setPhoneError("");
            }}
          ></PhoneInput>
          {phoneError && <p className="signup-error">{phoneError}</p>}
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
      </div>
    </section>
  );
}

export default SignUp;
