export type LoginRequest = {
  username: string;
  password: string;
};

export type User = {
  subject: string;
  roles: string[];
};

export type AuthResponse = {
  accessToken?: string;
  expiresIn?: number;
  subject: string;
  roles: string[];
};

export type UserInfo = User;

const GATEWAY_API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9003";

export async function login(request: LoginRequest): Promise<User> {
  const response = await fetch(`${GATEWAY_API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Inloggningen misslyckades");
  }

  const data = await response.json();
  return {
    subject: data.subject,
    roles: data.roles ?? [],
  };
}

export async function logout(): Promise<void> {
  const response = await fetch(`${GATEWAY_API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Utloggningen misslyckades");
  }
}
