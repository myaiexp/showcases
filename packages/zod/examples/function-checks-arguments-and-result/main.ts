// z.function().implement(): bad arguments or a bad return value throw a ZodError
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { sampleRows, type Row } from '../../shared/rows.ts';
import { createStage } from '../../shared/stage.ts';
import { codeLine } from '../../shared/widgets.ts';

// The contract: two numbers in, a whole number out.
const Divide = z.function({ input: [z.number(), z.number()], output: z.number().int() });
// The plain logic stays free of checks.
const divide = Divide.implement((a, b) => a / b);

const CALLS: unknown[][] = [[12, 4], ['12', 4], [7, 2], [12], [9, 3, 1]];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each row is one call of divide(…).' });
  codeLine(stage.root, 'z.function({ input: [z.number(), z.number()], output: z.number().int() })');
  const rows = sampleRows(stage.root, stage, { inTitle: 'Call', outTitle: 'Result' });
  const call = (args: unknown[]): Row => {
    const text = `divide(${args.map((a) => JSON.stringify(a)).join(', ')})`;
    try {
      // Cast: the wrapped function is typed for numbers, the sample calls are not.
      const data = (divide as (...a: unknown[]) => unknown)(...args);
      return { input: text, result: { success: true, data } };
    } catch (err) {
      return { input: text, result: { success: false, error: err as z.ZodError } };
    }
  };
  const results = CALLS.map(call);
  rows.show(results);
  stage.say('Only the first call ran cleanly: a text argument, a missing one, an extra one or a decimal answer all throw a ZodError', 'info');
  return stage.dispose;
};

export default mount;
