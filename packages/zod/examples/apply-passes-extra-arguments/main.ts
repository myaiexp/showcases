// .apply(fn, extra): arguments after the function are passed on to it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// Missing or null becomes the fallback; anything else is left to the schema.
function withFallback<T extends z.ZodType>(schema: T, value: z.output<T>) {
  return schema.nullish().transform((val) => val ?? value);
}

const Nickname = z.string().apply(withFallback, 'anonymous');
const Phone = z.string().min(6).apply(withFallback, 'n/a');

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: same function, different fallback.',
    inputs: [undefined, null, 'ann', 42],
    inTitle: 'Value',
    outTitle: 'Result',
    noun: 'values',
    variants: [
      { label: 'Nickname', code: 'z.string().apply(withFallback, "anonymous")', schema: Nickname, say: 'Missing and null become "anonymous"; a number is still not text' },
      { label: 'Phone', code: 'z.string().min(6).apply(withFallback, "n/a")', schema: Phone, say: 'Missing and null become "n/a"; "ann" is too short for a phone number' },
    ],
  });

export default mount;
