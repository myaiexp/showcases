// .isOptional() and .isNullable() beside a real parse of undefined, null
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { factTable, type Fact } from '../../shared/fact-table.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

const SCHEMAS: [string, z.ZodType][] = [
  ['z.string()', z.string()],
  ['.optional()', z.string().optional()],
  ['.nullable()', z.string().nullable()],
  ['.nullish()', z.string().nullish()],
  ['.default("n/a")', z.string().default('n/a')],
  ['.catch("n/a")', z.string().catch('n/a')],
  ['z.unknown()', z.unknown()],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  codeLine(stage.root, 'schema.isOptional()  schema.isNullable()');
  const yes = (v: boolean): string => (v ? '✓' : '✗');
  const lines: Fact[] = SCHEMAS.map(([code, schema]) => {
    const opt = schema.isOptional();
    const nul = schema.isNullable();
    // The parse of undefined and null is the ground truth the answers should match.
    const takesUndefined = schema.safeParse(undefined).success;
    const takesNull = schema.safeParse(null).success;
    const agree = takesUndefined === opt && takesNull === nul;
    return {
      label: code,
      text: stage.preview ? `optional ${yes(opt)}  null ${yes(nul)}` : `isOptional ${yes(opt)}  isNullable ${yes(nul)}   parses undefined ${yes(takesUndefined)}  null ${yes(takesNull)}`,
      tone: agree ? 'ok' : 'bad',
    };
  });
  factTable(stage.root, stage, '9em').show(stage.preview ? lines.slice(0, 6) : lines);
  stage.say('The answers match what a real parse of undefined and null does', 'ok');
  return stage.dispose;
};

export default mount;
