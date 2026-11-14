// A clashing intersection: an issue in Zod 3, a thrown Error in Zod 4
import * as z from 'zod';
import * as z3 from 'zod/v3';
import type { Mount } from '@/types.ts';
import type { Result } from '../../shared/verdict.ts';
import { compareDemo } from '../../shared/string-demo.ts';

// Wraps a schema so a thrown Error shows up as one row instead of breaking the page.
function catching(schema: { safeParse(input: unknown): Result }): { safeParse(input: unknown): Result } {
  return {
    safeParse(input) {
      try {
        return schema.safeParse(input);
      } catch (err) {
        const e = err as Error;
        return { success: false, error: { issues: [{ path: [], message: `threw ${e.constructor.name}: ${e.message}` }] } };
      }
    },
  };
}

// One side turns a name into its length, the other into capitals: a number and a text cannot merge.
const clash4 = z.intersection(z.string().transform((s) => s.length), z.string().transform((s) => s.toUpperCase()));
const clash3 = z3.intersection(z3.string().transform((s) => s.length), z3.string().transform((s) => s.toUpperCase()));
const fine4 = z.intersection(z.object({ name: z.string() }), z.object({ age: z.number() }));

const mount: Mount = (el, ctx) =>
  compareDemo(el, ctx, {
    hint: 'Switch schemas: only the clashing one in Zod 4 throws.',
    inputs: ['ana'],
    noun: 'inputs',
    inTitle: 'Input',
    outTitle: 'Result',
    variants: [
      { label: 'Zod 4: a clash', code: 'z.intersection(…length…, …upper-case…)', schema: catching(clash4), say: 'Zod 4 threw a plain Error: a broken schema is not a validation problem' },
      { label: 'Zod 3: a clash', code: 'zod/v3: the same intersection', schema: catching(clash3), say: 'Zod 3 reported invalid_intersection_types as an ordinary issue' },
      {
        label: 'Zod 4: mergeable',
        code: 'z.intersection(z.object({ name }), z.object({ age }))',
        schema: catching(fine4),
        inputs: [{ name: 'ana', age: 31 }, { name: 'ana' }],
        say: 'Objects with different keys merge; intersections only throw when the two results contradict',
      },
    ],
  });

export default mount;
