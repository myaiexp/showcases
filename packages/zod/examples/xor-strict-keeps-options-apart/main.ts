// Overlapping object options match together under xor; .strict() on the narrow one fixes it
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { inlineCompare } from '../../shared/inline-compare.ts';

const name = z.object({ name: z.string() });
const version = name.extend({ version: z.string() });

const INPUTS: unknown[] = [{ name: 'zod' }, { name: 'zod', version: '4' }, { version: '4' }];

const mount: Mount = (el, ctx) =>
  inlineCompare(el, ctx, {
    inputs: INPUTS,
    variants: [
      {
        label: 'plain objects',
        code: 'z.xor([name, version])  // name strips "version", so both match',
        schema: z.xor([name, version]),
        say: () => 'name-plus-version fits both options at once, so xor rejects it',
      },
      {
        label: 'name.strict()',
        code: 'z.xor([name.strict(), version])  // name refuses extra keys',
        schema: z.xor([name.strict(), version]),
        say: () => 'strict name no longer matches an input with a version: exactly one option left',
      },
    ],
    hint: 'Switch to the strict variant and the middle sample passes.',
  });

export default mount;
