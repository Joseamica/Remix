// app/sessions.js
import { createCookieSessionStorage, json, redirect } from "@remix-run/node"; // or cloudflare/deno
import { v4 as uuidv4 } from "uuid";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secrets: ["secret"],
    secure: process.env.NODE_ENV === "production",
  },
});
const { commitSession } = sessionStorage;
export { commitSession };

const USER_SESSION_KEY = "userId";

export async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(request) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId ?? `guest-${uuidv4()}`;
}

function guestUser(userId) {
  return {
    id: userId,
    email: "Guest",
  };
}

export async function getUser(request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = userId.startsWith("guest-") && guestUser(userId);

  if (user) return user;
}

export async function createUserSession({ request, userId, remember }) {
  const session = await getSession(request);

  session.set(USER_SESSION_KEY, userId);
  // if (userId === undefined) {
  //   session.set(USER_SESSION_KEY, uuidv4());
  // }

  return {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  };
}

// Username:    postgres
// Password:    1204bfb25270095b19d7c87ec88d63bef5065010c418a2e7
// Hostname:    avoqado-db.internal
// Proxy Port:  5432
// PG Port: 5433
// Save your credenti

// Username:    postgres
// Password:    dd6225099f7265f679a59526136a3931b9b5045f54620771
// Hostname:    avoq-db.internal
// Proxy Port:  5432
// PG Port: 5433
