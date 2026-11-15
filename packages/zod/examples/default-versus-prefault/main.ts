// Same fallback, two ways: default skips the trim and capitals, prefault runs them
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// A default is the finished output. A prefault is input that still goes through the schema.
const AsDefault = z.string().trim().toUpperCase().default('  tuna  ');
const AsPrefault = z.string().trim().toUpperCase().prefault('  tuna  ');

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch between default and prefault; the real input is treated the same.',
    inputs: [undefined, '  salmon ', 'cod'],
    inTitle: 'Fish',
    outTitle: 'Result',
    noun: 'fish',
    variants: [
      {
        label: '.default("  tuna  ")',
        code: "z.string().trim().toUpperCase().default('  tuna  ')",
        schema: AsDefault,
        say: 'The default comes back exactly as written, spaces and lower case included',
      },
      {
        label: '.prefault("  tuna  ")',
        code: "z.string().trim().toUpperCase().prefault('  tuna  ')",
        schema: AsPrefault,
        say: 'The prefault went through trim and toUpperCase, so a missing value is "TUNA"',
      },
    ],
  });

export default mount;
