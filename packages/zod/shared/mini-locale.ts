// Mini kit: run a schema with no locale or one locale, then restore
import * as zm from 'zod/mini';
import { keepConfig, localeConfig, settle } from './error-config.ts';
import type { Result } from './verdict.ts';

/** Anything with a safeParse the views can read. */
export interface Parser {
  safeParse(input: unknown): Result;
}

/**
 * The page-wide config holds English as soon as any classic schema exists, so a Mini schema
 * would speak English too. This runs it as a bare Zod Mini build would: no locale at all.
 */
export function noLocale(schema: Parser): Parser {
  return {
    safeParse: (input) =>
      keepConfig(() => {
        delete (zm.config() as Record<string, unknown>)['localeError'];
        return settle(schema.safeParse(input));
      }),
  };
}

/** Runs the schema after `z.config(locale())` for the language code, restoring the config after. */
export function withLocale(schema: Parser, code: string): Parser {
  return {
    safeParse: (input) =>
      keepConfig(() => {
        const cfg = localeConfig(code);
        if (cfg) zm.config(cfg);
        return settle(schema.safeParse(input));
      }),
  };
}
