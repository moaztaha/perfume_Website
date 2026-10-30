import { env } from "@/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Get JWT token from auth storage (localStorage).
 */
function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null; 
  }

  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) return null;

    const parsed = JSON.parse(authStorage) as {
      state?: { token?: string };
    };

    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
}


export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = env.apiBaseUrl || "http://localhost:1337";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const token = getAuthToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    let details = "";
    try {
      const errJson = await response.json();
      if (errJson?.error?.message) {
        details = ` - ${errJson.error.message}`;
      }
    } catch {
    }

    throw new ApiError(
      `Request to ${path} failed: ${response.status} ${response.statusText}${details}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
