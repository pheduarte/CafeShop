import type { User } from "../types/user"

const API_URL = "http://localhost:3001/users";

export async function createUser(user: User) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(user),
    });

    if(!response.ok) {
        throw new Error("Failed to create user.");
    }

    return response.json();
}

export async function signInUser(email: string, password: string) {
  const trimmedEmail = email.trim();
  const response = await fetch(
    `${API_URL}?email=${encodeURIComponent(trimmedEmail)}`
  );

  if (!response.ok) {
    console.log("Failed to sign");
    throw new Error("Failed to sign in");
  }

  const users: User[] = await response.json();

  return users.find((user) => user.password === password) ?? null;
}
