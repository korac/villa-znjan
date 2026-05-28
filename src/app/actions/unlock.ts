"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SITE_AUTH, signAuthToken } from "@/lib/site-auth";

export type UnlockState = { status: "idle" | "error" };

function safeReturnPath(from: string): string {
  // Only allow internal paths; reject protocol-relative or external URLs.
  if (!from.startsWith("/") || from.startsWith("//")) return "/";
  return from;
}

export async function unlock(
  _prev: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const password = process.env.SITE_PASSWORD;
  const from = safeReturnPath(String(formData.get("from") || "/"));

  // Gate disabled — just send them through.
  if (!password) redirect(from);

  const submitted = String(formData.get("password") || "");

  // Constant-time comparison
  const enc = new TextEncoder();
  const expected = enc.encode(password);
  const actual = enc.encode(submitted);
  if (expected.length !== actual.length) return { status: "error" };
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i];
  if (diff !== 0) return { status: "error" };

  const secret = process.env.SITE_AUTH_SECRET || password;
  const token = await signAuthToken(secret);

  const c = await cookies();
  c.set(SITE_AUTH.cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SITE_AUTH.maxAgeSeconds,
  });

  redirect(from);
}
