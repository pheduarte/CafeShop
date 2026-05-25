import "./signIn.scss";
import "../../../ui/formUI.scss";
import { useState } from "react";
import type { User } from "../../../types/user";
import { useAuth } from "../../../hooks/useAuth";
import { signInUser } from "../services/signInUser";

type SignInProps = {
  onSignIn: (user: User, password: string) => void;
  closeSignIn: () => void;
};

function SignIn({ onSignIn, closeSignIn }: SignInProps) {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const user = await signInUser(formData.email, formData.password);

      if (!user) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      login(user);
      onSignIn(user, formData.password);
      closeSignIn();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error("Sign in error:", errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <section className="signin-details">
      <div className="user-details-signin">
        <div className="close-button-container">
          <div>
            <h2>Log In</h2>
          </div>
          <button className="close-button" onClick={closeSignIn}>
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        <form className="card-form" onSubmit={handleSubmit}>
          <label> Email: </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={isLoading}
          />
          <label> Password: </label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            disabled={isLoading}
          />
          <button type="submit" className="signin-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
