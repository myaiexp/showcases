// Zod string formats and the format, contentEncoding or pattern keyword each one becomes
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS: [code: string, schema: z.ZodType][] = [
  ['z.email()', z.email()],
  ['z.url()', z.url()],
  ['z.uuid()', z.uuid()],
  ['z.iso.date()', z.iso.date()],
  ['z.iso.datetime()', z.iso.datetime()],
  ['z.iso.duration()', z.iso.duration()],
  ['z.ipv4()', z.ipv4()],
  ['z.base64()', z.base64()],
  ['z.iso.time()', z.iso.time()],
  ['z.ulid()', z.ulid()],
  ['z.nanoid()', z.nanoid()],
];

/** The keywords the format added, with a long pattern shown as its first characters. */
function keywords(schema: z.ZodType): unknown {
  const { $schema: _a, type: _b, ...rest } = z.toJSONSchema(schema) as Record<string, unknown>;
  return { ...rest, ...(typeof rest['pattern'] === 'string' ? { pattern: `${rest['pattern'].slice(0, 12)}…` } : {}) };
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every one of these is { type: "string", … } plus the keywords shown.' });
  evalLog(stage, () => FORMATS.map(([code, schema]) => ({ code, run: () => keywords(schema) })), {
    cardRows: 4,
    ms: 1000,
    final: '✓ Most formats get a "format" name and a "pattern"; base64 also gets contentEncoding; iso.time has only a pattern',
  });
  return stage.dispose;
};

export default mount;
