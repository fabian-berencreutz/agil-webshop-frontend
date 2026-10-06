export type LoginRequest = {
  username: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  expiresIn: number;
  subject: string;
  roles: string[];
};

export type UserInfo = {
  subject: string;
  roles: string[];
}

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
  sessionStorage.setItem("user", JSON.stringify({subject: data.subject, roles: data.roles}));

  return data;
}

export function logout(): void {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
}

export function getToken(): string | null {
  return sessionStorage.getItem("token");
}

export function getUser(): UserInfo | null {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}
export function isAdmin(): boolean {
  const roles = getUser()?.roles;
  if (!roles) return false;
  return roles.includes("ADMIN") || roles.includes("ROLE_ADMIN");
}
