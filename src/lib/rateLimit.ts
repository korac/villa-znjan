/**
 * In-memory rate limiting for the contact form.
 *
 * Counts live in this module's memory, i.e. inside one warm serverless
 * instance. They are not shared between instances, and they reset on a cold
 * start or a deploy, so this is a backstop behind Turnstile rather than a hard
 * guarantee. A shared limit would need an external store (e.g. Upstash Redis).
 *
 * Keys may hold personal data (IP addresses, email addresses). They are never
 * persisted and drop out once their longest window has passed.
 */

export type RateRule = { limit: number; windowMs: number };

const hits = new Map<string, number[]>();

/** Above this many keys, stale entries are swept on the next call. */
const SWEEP_THRESHOLD = 500;
const DAY_MS = 24 * 60 * 60 * 1000;

function sweep(now: number) {
  for (const [key, times] of hits) {
    if (times.every((t) => now - t >= DAY_MS)) hits.delete(key);
  }
}

/**
 * Records a hit for `key` and reports whether it is within every rule.
 * A blocked attempt is not recorded, so a blocked caller is not locked out
 * for longer than the window they exceeded.
 */
export function allow(key: string, rules: RateRule[]): boolean {
  const now = Date.now();
  if (hits.size > SWEEP_THRESHOLD) sweep(now);

  const longest = Math.max(...rules.map((r) => r.windowMs));
  const recent = (hits.get(key) ?? []).filter((t) => now - t < longest);

  const blocked = rules.some(
    (r) => recent.filter((t) => now - t < r.windowMs).length >= r.limit,
  );
  if (!blocked) recent.push(now);

  if (recent.length > 0) hits.set(key, recent);
  else hits.delete(key);

  return !blocked;
}

export const MINUTE_MS = 60 * 1000;
export { DAY_MS };
