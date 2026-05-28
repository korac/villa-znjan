/**
 * Stealth-mode password gate helpers.
 *
 * The gate is enabled when `SITE_PASSWORD` is set. On successful unlock we
 * issue an HMAC-signed cookie containing the expiry timestamp; the proxy
 * verifies it on every request. Cookie value: `<expires>.<base64(hmac)>`.
 *
 * Web Crypto is used so this code runs in the Edge runtime (proxy.ts).
 */

const COOKIE_NAME = "vz_auth";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

async function hmac(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/=+$/, "");
}

export async function signAuthToken(secret: string): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  const payload = String(expires);
  const sig = await hmac(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifyAuthToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = await hmac(secret, payload);
  // Constant-time compare
  if (expected.length !== sig.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  if (diff !== 0) return false;

  const expires = Number(payload);
  if (!Number.isFinite(expires)) return false;
  return expires > Math.floor(Date.now() / 1000);
}

export const SITE_AUTH = {
  cookieName: COOKIE_NAME,
  maxAgeSeconds: MAX_AGE_SECONDS,
};
