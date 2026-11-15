// z.null(), z.undefined() and z.void() against the two kinds of nothing
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [null, undefined, 0, '', false, 'null'];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    outTitle: 'Zod says',
    inputs: INPUTS,
    variants: [
      { label: 'z.null()', code: 'z.null()  // the value null, on purpose empty', schema: z.null() },
      { label: 'z.undefined()', code: 'z.undefined()  // nothing there at all', schema: z.undefined() },
      { label: 'z.void()', code: 'z.void()  // same as z.undefined()', schema: z.void() },
    ],
  });

export default mount;
