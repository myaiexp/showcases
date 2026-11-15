// uppercase() and lowercase() reject wrong-case text instead of fixing it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    showOutput: false,
    outTitle: 'Zod says',
    variants: [
      { label: 'uppercase', code: 'z.string().uppercase()  // country code', schema: z.string().uppercase(), inputs: ['FI', 'fi', 'Fi', 'FI-2', 'ÄÖ'] },
      { label: 'lowercase', code: 'z.string().lowercase()  // url slug', schema: z.string().lowercase(), inputs: ['hello-world', 'Hello-World', 'hello world', 'ÄÖ', '123'] },
    ],
  });

export default mount;
