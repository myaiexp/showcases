// Errors kit: run code that sets z.config(), then always put the page's old config back
import * as z from 'zod';
import type { Result } from './verdict.ts';

type Config = Parameters<typeof z.config>[0];

/**
 * Runs `fn` (which may call z.config()) and then restores the page-wide config exactly:
 * old values back, keys `fn` added deleted. `fn` must be synchronous and must read the
 * issues it needs (see settle): Zod builds messages when `result.error` is first read,
 * so a message read after the restore would use the page's config, not the example's.
 */
export function keepConfig<T>(fn: () => T): T {
  const live = z.config() as Record<string, unknown>;
  const before = { ...live };
  try {
    return fn();
  } finally {
    for (const k of Object.keys(live)) if (!(k in before)) delete live[k];
    Object.assign(live, before);
  }
}

/** Reads a result's issues now, so their messages are built under the current config. */
export function settle<R extends Result>(result: R): R {
  if (!result.success) void result.error.issues.map((i) => i.message);
  return result;
}

/** The locale's config under its name ("de"), or undefined when Zod has no such locale. */
export function localeConfig(code: string): Config | undefined {
  const make = (z.locales as Record<string, (() => Config) | undefined>)[code];
  return make?.();
}
