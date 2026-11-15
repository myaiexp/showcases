// The same inputs through z.string() and z.coerce.string(): nothing is rejected
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const strict = z.string();
// Coercion runs String(input) first, so almost anything becomes text.
const coerced = z.coerce.string();

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    types: true,
    inputs: ['tuna', 42, true, null, undefined, [1, 2]],
    variants: [
      { label: 'z.string()', code: 'z.string()  // must already be text', schema: strict },
      {
        label: 'z.coerce.string()',
        code: 'z.coerce.string()  // String(input)',
        schema: coerced,
        say: () => 'Everything passes, even null and a list: coercion never says no to text',
      },
    ],
  });

export default mount;
