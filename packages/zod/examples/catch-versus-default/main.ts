// default answers to undefined, catch answers to any failure: what each one covers
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas and watch which rows are rescued.',
    inputs: [undefined, 'lots', 7],
    inTitle: 'Quantity',
    outTitle: 'Result',
    noun: 'quantities',
    variants: [
      { label: '.default(1)', code: 'z.number().default(1)', schema: z.number().default(1), say: 'Only the missing quantity is rescued: "lots" still fails' },
      { label: '.catch(1)', code: 'z.number().catch(1)', schema: z.number().catch(1), say: 'The wrong quantity is rescued, and so is the missing one, since undefined is not a number' },
      { label: '.default(1).catch(2)', code: 'z.number().default(1).catch(2)', schema: z.number().default(1).catch(2), say: 'Missing becomes 1 (the default), wrong becomes 2 (the catch)' },
    ],
  });

export default mount;
