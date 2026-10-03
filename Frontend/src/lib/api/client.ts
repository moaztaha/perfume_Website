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
 * HTTP helper for Strapi and feature services.
 */
export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = env.apiBaseUrl || "http://localhost:1337";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let details = "";
    try {
      const errJson = await response.json();
      if (errJson?.error?.message) {
        details = ` - ${errJson.error.message}`;
      }
    } catch {
      // Ignore JSON parse error on non-OK responses
    }

    throw new ApiError(
      `Request to ${path} failed: ${response.status} ${response.statusText}${details}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
