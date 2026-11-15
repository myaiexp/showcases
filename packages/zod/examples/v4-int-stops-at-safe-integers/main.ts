// z.number().int() over small, huge and infinite numbers, in Zod 4 and Zod 3
import * as z from 'zod';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [42, 1.5, Infinity, 2 ** 53 + 2, 1e20];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch versions: Zod 3 accepts the last two numbers.',
    inputs: INPUTS,
    inTitle: 'Quantity',
    outTitle: 'Result',
    noun: 'quantities',
    variants: [
      { label: 'Zod 4 (now)', code: 'z.number().int()', schema: z.number().int(), say: 'Zod 4 only accepts whole numbers JavaScript can hold exactly: 42 passes, the rest fail' },
      { label: 'Zod 3 (before)', code: 'zod/v3: z.number().int()', schema: z3.number().int(), say: 'Zod 3 accepted 9007199254740994 and 1e20, numbers that are already rounded' },
    ],
  });

export default mount;
