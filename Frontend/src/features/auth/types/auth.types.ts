export type User = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "manager";
  username?: string;
  roleName?: string;
  avatar?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};
