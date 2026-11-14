// A coerced boolean field: a missing key is false in Zod 3, an error in Zod 4
import * as z from 'zod';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const INPUTS = [{}, { newsletter: 'yes' }, { newsletter: '' }];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Three schemas, same inputs: only the first input differs.',
    inputs: INPUTS,
    inTitle: 'Form fields',
    outTitle: 'Result',
    noun: 'forms',
    variants: [
      { label: 'Zod 4 (now)', code: 'z.object({ newsletter: z.coerce.boolean() })', schema: z.object({ newsletter: z.coerce.boolean() }), say: 'Zod 4: the absent key is reported as missing instead of turned into false' },
      { label: 'Zod 4 with a default', code: 'z.coerce.boolean().default(false)', schema: z.object({ newsletter: z.coerce.boolean().default(false) }), say: 'Zod 4 with .default(false): the fallback is written down, so the form passes' },
      { label: 'Zod 3 (before)', code: 'zod/v3: z.coerce.boolean()', schema: z3.object({ newsletter: z3.coerce.boolean() }), say: 'Zod 3 coerced the missing key to false without a word' },
    ],
  });

export default mount;
