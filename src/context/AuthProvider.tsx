import { useState } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  });

  function login(loggedInUser: User) {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
