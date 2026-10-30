
const rawUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:1337";

const normalizedUrl = rawUrl.replace(/\/$/, "");

export const env = {
  strapiUrl: normalizedUrl,
  apiBaseUrl: normalizedUrl,
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API === "true",
};
