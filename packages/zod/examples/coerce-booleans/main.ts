// z.coerce.boolean() runs Boolean(input): the text "false" comes out true
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const strict = z.boolean();
// Boolean(input): any non-empty text is truthy, whatever it says.
const coerced = z.coerce.boolean();

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    inputs: ['true', 'false', '0', '', 1, 0, null],
    variants: [
      { label: 'z.boolean()', code: 'z.boolean()  // only true or false', schema: strict },
      {
        label: 'z.coerce.boolean()',
        code: 'z.coerce.boolean()  // Boolean(input)',
        schema: coerced,
        say: () => '"false" and "0" both became true: only empty text, 0 and null are falsy',
      },
    ],
  });

export default mount;
