// z.custom() with no function performs no validation; with one it does
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: the empty custom accepts everything.',
    inputs: ['hello', 42, null, undefined, { any: 'thing' }],
    cardInputs: ['hello', 42, null, undefined],
    inTitle: 'Value',
    outTitle: 'Result',
    noun: 'values',
    variants: [
      { label: 'z.custom()', code: 'z.custom<{ id: string }>()', schema: z.custom<{ id: string }>(), say: 'Every value passes, though TypeScript now believes each one is { id: string }' },
      {
        label: 'z.custom(fn)',
        code: 'z.custom<{ id: string }>(val => typeof val?.id === "string")',
        schema: z.custom<{ id: string }>((val) => typeof (val as { id?: unknown } | null)?.id === 'string'),
        say: 'With a function the schema says no to everything that has no text id',
        inputs: [{ id: 'u1' }, 'hello', null, undefined, { id: 7 }],
      },
    ],
  });

export default mount;
