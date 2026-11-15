// The same two list rules through refine (always code custom) and superRefine (too_big + custom)
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const List = z.array(z.string());
const isUnique = (v: string[]): boolean => v.length === new Set(v).size;

const viaRefine = List.refine((v) => v.length <= 3, { error: 'Too many items' }).refine(isUnique, { error: 'No duplicates allowed.' });

const viaSuper = List.superRefine((val, ctx) => {
  if (val.length > 3) {
    ctx.addIssue({ code: 'too_big', maximum: 3, origin: 'array', inclusive: true, message: 'Too many items', input: val });
  }
  if (!isUnique(val)) {
    ctx.addIssue({ code: 'custom', message: 'No duplicates allowed.', input: val });
  }
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    codes: true,
    hint: 'Edit the list: the small tag on each issue is its code.',
    columns: [
      { title: 'refine', code: '.refine(…).refine(…)', schema: viaRefine },
      { title: 'superRefine', code: '.superRefine((val, ctx) => …)', schema: viaSuper },
    ],
    samples: [
      { label: 'long and repeating', value: ['a', 'b', 'b', 'c'] },
      { label: 'too long', value: ['a', 'b', 'c', 'd'] },
      { label: 'repeats', value: ['a', 'a'] },
    ],
    say: ([, sup]) => (sup && !sup.success ? `superRefine reported ${sup.error.issues.map((i) => i.code).join(' + ')}; refine can only say custom` : '✓ Nothing to report'),
  });

export default mount;
