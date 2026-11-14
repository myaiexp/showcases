// A default is returned as it is: it skips the schema's own rules
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// The default "ab" is shorter than the minimum, and Zod never looks.
const Nickname = z.string().min(5).default('ab');
const Plain = z.string().min(5);

const INPUTS = [undefined, 'ab', 'captain'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: only the default one answers when the value is missing.',
    inputs: INPUTS,
    inTitle: 'Nickname',
    outTitle: 'Result',
    noun: 'nicknames',
    ms: 4200,
    variants: [
      {
        label: 'z.string().min(5)',
        code: 'z.string().min(5)',
        schema: Plain,
        say: 'Without a default a missing nickname is an error, and so is "ab"',
      },
      {
        label: '.default("ab")',
        code: "z.string().min(5).default('ab')",
        schema: Nickname,
        say: 'A missing nickname becomes "ab", though "ab" would fail the 5-character rule if it were typed in',
      },
    ],
  });

export default mount;
