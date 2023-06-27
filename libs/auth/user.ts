const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function doFetchUser(cookies: string) {
  return fetch(`${BASE_URL}/api/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies,
    },
    // cache: "force-cache",
  });
}

export function isAdminUser(user: any) {
  return user && user.role === "ADMIN";
}
