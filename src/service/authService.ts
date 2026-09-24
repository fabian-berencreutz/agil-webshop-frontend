export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

const AUTH_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${AUTH_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Inloggningen misslyckades");
  }

  const data: AuthResponse = await response.json();

  sessionStorage.setItem("token", data.accessToken);

  return data;
}

export function getToken(): string | null {
  return sessionStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}