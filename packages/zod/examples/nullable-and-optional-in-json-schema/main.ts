// Nullable adds "null" to the types, optional only changes "required", undefined has no form
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const bare = (s: z.ZodType, opts?: Parameters<typeof z.toJSONSchema>[1]): unknown => {
  const { $schema: _, ...rest } = z.toJSONSchema(s, opts) as Record<string, unknown>;
  return rest;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line converts one schema and shows the JSON Schema it became.' });
  evalLog(
    stage,
    () => [
      { code: 'z.string().nullable()', run: () => bare(z.string().nullable()) },
      { code: 'z.string().min(5).nullable()', run: () => bare(z.string().min(5).nullable()), say: 'With a rule attached, "null" becomes a second option (anyOf)' },
      { code: "z.string().nullable()  // target: 'openapi-3.0'", run: () => bare(z.string().nullable(), { target: 'openapi-3.0' }), say: 'OpenAPI 3.0 spells it nullable: true' },
      { code: 'z.object({ nick: z.string().optional() })', run: () => bare(z.object({ nick: z.string().optional() })), say: 'optional: nick is listed, but there is no "required" at all' },
      { code: 'z.undefined()', run: () => bare(z.undefined()), tone: 'bad', say: 'JSON has no undefined: it throws', sayTone: 'bad' },
    ],
    { cardRows: 4, ms: 1300, final: '✓ Nullable and optional are different things in JSON Schema too' },
  );
  return stage.dispose;
};

export default mount;
