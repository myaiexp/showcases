// A bare z.transform: every input is accepted and handed to String()
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const castToString = z.transform((val) => String(val));

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    outTitle: 'Came out',
    noun: 'inputs',
    inputs: ['asdf', 123, true, null, undefined, [1, 2, 3], 4.5],
    cardInputs: ['asdf', 123, true, null, undefined, [1, 2, 3]],
    variants: [{ label: 'z.transform', code: 'z.transform((val) => String(val))', schema: castToString, say: 'Nothing is rejected: a transform validates nothing, it only converts.' }],
  });

export default mount;
