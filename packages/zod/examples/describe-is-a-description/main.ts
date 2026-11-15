// .describe() is .meta() with only a description, and both give a new schema back
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const withoutDialect = ({ $schema: _, ...rest }: Record<string, unknown>) => rest;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line runs, and the result is what the code returned.' });
  evalLog(
    stage,
    () => {
      const base = z.string();
      const described = base.describe('Shipping postcode');
      const same = base.meta({ description: 'Shipping postcode' });
      return [
        { code: "base.describe('Shipping postcode').meta()", run: () => described.meta() },
        { code: "base.meta({ description: 'Shipping postcode' }).meta()", run: () => same.meta() },
        { code: 'base.meta()  // the original schema', run: () => base.meta(), tone: 'warn' as const, say: 'describe() returned a new schema: the original has nothing attached' },
        { code: 'z.toJSONSchema(described)', run: () => withoutDialect(z.toJSONSchema(described)), say: 'The description travels into JSON Schema too' },
      ];
    },
    { final: '✓ describe("x") and meta({ description: "x" }) store the same thing', cardRows: 3 },
  );
  return stage.dispose;
};

export default mount;
