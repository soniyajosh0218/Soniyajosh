"use server";

export type UnlockResult = { ok: true } | { ok: false; error: string };

export async function unlockSite(password: string): Promise<UnlockResult> {
  const expected = (process.env.SITE_PASSWORD ?? "").trim().toLowerCase();

  if (!expected) {
    return { ok: false, error: "Password is not configured" };
  }

  if (password.trim().toLowerCase() !== expected) {
    return { ok: false, error: "Not quite… try the hint below" };
  }

  return { ok: true };
}
