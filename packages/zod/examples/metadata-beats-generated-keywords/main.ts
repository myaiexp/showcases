// Metadata is written last, so it can replace what Zod worked out (or fill a gap)
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
      { code: 'z.toJSONSchema(z.string())', run: () => bare(z.string()) },
      { code: "z.toJSONSchema(z.string().meta({ type: 'number' }))", run: () => bare(z.string().meta({ type: 'number' })), tone: 'warn', say: 'The metadata won: "type" is now number', sayTone: 'warn' },
      { code: 'z.toJSONSchema(z.date())', run: () => bare(z.date()), tone: 'bad', say: 'A Date has no JSON Schema form, so it throws…' },
      {
        code: "z.date().meta({ type: 'string', format: 'date-time' })",
        run: () => bare(z.date().meta({ type: 'string', format: 'date-time' }), { unrepresentable: 'any' }),
        tone: 'ok',
        say: '…until metadata fills in the missing description',
        sayTone: 'ok',
      },
    ],
    { cardRows: 4, ms: 1300, final: '✓ Metadata fields are copied over the top of what Zod generated' },
  );
  return stage.dispose;
};

export default mount;
