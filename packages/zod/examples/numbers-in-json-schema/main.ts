// Number types: integer, safe-integer and 32-bit limits show up as type and bounds
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const NUMBERS: [code: string, schema: z.ZodType][] = [
  ['z.number()', z.number()],
  ['z.int()', z.int()],
  ['z.int32()', z.int32()],
  ['z.float32()', z.float32()],
  ['z.number().int().min(1).max(10)', z.number().int().min(1).max(10)],
  ['z.number().gt(0)', z.number().gt(0)],
  ['z.number().multipleOf(5)', z.number().multipleOf(5)],
];

const bare = (s: z.ZodType): unknown => {
  const { $schema: _, ...rest } = z.toJSONSchema(s) as Record<string, unknown>;
  return rest;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Whole numbers become "integer"; the limits Zod enforces are written out.' });
  evalLog(stage, () => NUMBERS.map(([code, schema]) => ({ code, run: () => bare(schema) })), {
    cardRows: 4,
    ms: 1100,
    final: '✓ z.int() even writes its safe-integer limits; gt(0) becomes exclusiveMinimum',
  });
  return stage.dispose;
};

export default mount;
