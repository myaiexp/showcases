// A registry limited to string schemas: TypeScript refuses a number schema, runtime does not
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { evalLog } from '../../shared/eval-log.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The second type argument is checked by TypeScript while you write code, not by Zod when it runs.' });
  evalLog(
    stage,
    () => {
      const stringsOnly = z.registry<{ description: string }, z.ZodString>();
      const name = z.string();
      const age = z.number();
      return [
        { code: "stringsOnly.add(name, { description: 'A name' })", run: () => (stringsOnly.add(name, { description: 'A name' }), stringsOnly.has(name)), tone: 'ok' as const, say: 'A string schema is welcome' },
        {
          code: "stringsOnly.add(age, { description: 'An age' })  // TS error",
          run: () => {
            // @ts-expect-error 'ZodNumber' is not assignable to 'ZodString': the editor flags this line
            stringsOnly.add(age, { description: 'An age' });
            return 'stored anyway';
          },
          tone: 'warn' as const,
          say: 'The editor refuses the number schema, but the running code accepts it',
          sayTone: 'warn' as const,
        },
        {
          code: 'stringsOnly.has(age)',
          // @ts-expect-error has() is typed to string schemas as well
          run: () => stringsOnly.has(age),
          tone: 'warn' as const,
        },
      ];
    },
    { final: '⚠ The constraint protects you while writing code; it adds no runtime check', finalTone: 'warn', cardRows: 3 },
  );
  return stage.dispose;
};

export default mount;
