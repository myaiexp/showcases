// The same settings schema in Zod 4 and Zod 3: only Zod 4 fills the default
import * as z from 'zod';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// The field is a default first, then optional: "theme is light unless said otherwise".
const Settings4 = z.object({ theme: z.string().default('light').optional() });
const Settings3 = z3.object({ theme: z3.string().default('light').optional() });

const INPUTS = [{}, { theme: undefined }, { theme: 'dark' }];

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch between Zod 4 and Zod 3: the first two inputs differ.',
    inputs: INPUTS,
    inTitle: 'Saved settings',
    outTitle: 'Result',
    noun: 'settings',
    variants: [
      { label: 'Zod 4 (now)', code: 'z.object({ theme: z.string().default("light").optional() })', schema: Settings4, say: 'Zod 4 fills in theme: "light" whenever the key is missing or undefined' },
      { label: 'Zod 3 (before)', code: 'zod/v3: same schema', schema: Settings3, say: 'Zod 3 left the result empty: the default never ran under .optional()' },
    ],
  });

export default mount;
