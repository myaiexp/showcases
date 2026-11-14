// A default fires on undefined only: null and "" are real values
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const Guest = z.string().default('guest');
const NullOk = z.string().nullable().default('guest');

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas to see what null does.',
    inputs: [undefined, null, '', 'ann', 7],
    cardInputs: [undefined, null, '', 'ann'],
    inTitle: 'Name',
    outTitle: 'Result',
    noun: 'names',
    variants: [
      {
        label: '.default("guest")',
        code: "z.string().default('guest')",
        schema: Guest,
        say: 'Only a missing name becomes "guest": null is not a string, so it fails, while "" is a string and stays',
      },
      {
        label: '.nullable().default("guest")',
        code: "z.string().nullable().default('guest')",
        schema: NullOk,
        say: 'null is now an allowed value, so it passes as null: only a missing name becomes "guest"',
      },
    ],
  });

export default mount;
