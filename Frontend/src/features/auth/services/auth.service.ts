import { env } from "@/config/env";
import { getStrapiMediaUrl } from "@/features/products/utils/strapi-mapper";
import type { LoginCredentials, AuthResponse, User } from "../types/auth.types";


type StrapiLoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    blocked: boolean;
    role?: {
      type: string; 
      name: string;
    };
    avatar?: { url?: string } | null;
    image?: { url?: string } | null;
  };
};

type StrapiMeResponse = {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  role: {
    type: string;
    name: string;
  };
  avatar?: { url?: string } | null;
  image?: { url?: string } | null;
};


function getBaseUrl(): string {
  return (env.apiBaseUrl || "http://localhost:1337").replace(/\/$/, "");
}
function mapStrapiUser(
  strapiUser: StrapiLoginResponse["user"] | StrapiMeResponse,
  roleType: string
): User {
  const role: User["role"] = roleType === "admin" ? "admin" : "manager";

  return {
    id: String(strapiUser.id),
    email: strapiUser.email,
    name: strapiUser.username,
    username: strapiUser.username,
    role,
    roleName: strapiUser.role?.name,
    avatar: strapiUser.avatar?.url || strapiUser.image?.url
      ? getStrapiMediaUrl(strapiUser.avatar?.url || strapiUser.image?.url)
      : undefined,
  };
}


export async function loginService(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const baseUrl = getBaseUrl();

  // 1. Authenticate with Strapi
  const loginRes = await fetch(`${baseUrl}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: credentials.email, 
      password: credentials.password,
    }),
  });

  if (!loginRes.ok) {
    let message = "Invalid email or password.";
    try {
      const body = await loginRes.json();
      if (body?.error?.message) {
        
        message =
          loginRes.status === 400
            ? "Invalid email or password."
            : body.error.message;
      }
    } catch {
     
    }
    throw new Error(message);
  }

  const loginData: StrapiLoginResponse = await loginRes.json();
  const jwt = loginData.jwt;

  const meRes = await fetch(`${baseUrl}/api/users/me?populate=*`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

  if (!meRes.ok) {
    throw new Error("Failed to verify user profile. Please try again.");
  }

  const meData: StrapiMeResponse = await meRes.json();

  const roleType = meData.role?.type ?? "";
  if (roleType !== "admin") {
    throw new Error(
      "Access denied. You do not have permission to access the admin dashboard."
    );
  }

  const user = mapStrapiUser(meData, roleType);

  return { user, token: jwt };
}

/**
 * Logout
 */
export async function logoutService(): Promise<void> {
  return Promise.resolve();
}


export async function verifyTokenService(token: string): Promise<User> {
  const baseUrl = getBaseUrl();

  const res = await fetch(`${baseUrl}/api/users/me?populate=*`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Session expired. Please sign in again.");
  }

  const meData: StrapiMeResponse = await res.json();
  const roleType = meData.role?.type ?? "";

  if (roleType !== "admin") {
    throw new Error("Access denied.");
  }

  return mapStrapiUser(meData, roleType);
}
