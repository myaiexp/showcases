// .safeExtend() on a schema with a refine: the rule survives, extend() throws
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { note } from '../../shared/widgets.ts';

const Base = z
  .object({ password: z.string(), confirm: z.string() })
  .refine((v) => v.password === v.confirm, { error: 'Passwords do not match', path: ['confirm'] });

// Plain extend() will not overwrite a field of a schema that has a refinement.
let extendError = 'did not throw';
try {
  Base.extend({ password: z.string().min(8) });
} catch (err) {
  extendError = err instanceof Error ? err.message : String(err);
}
const Stricter = Base.safeExtend({ password: z.string().min(8) });

const SAMPLES = [
  { label: 'long and matching', value: { password: 'correct-horse', confirm: 'correct-horse' } },
  { label: 'mismatch', value: { password: 'correct-horse', confirm: 'correct-house' } },
  { label: 'too short', value: { password: 'abc', confirm: 'abc' } },
];

const VARIANTS: ObjectVariant[] = [
  {
    label: 'Base',
    code: 'Base = z.object({ password, confirm }).refine(match)',
    schema: Base,
    say: (r) => (r.success ? '✓ The two fields match' : '✗ The refine rule caught the mismatch, pinned on confirm'),
  },
  {
    label: 'Base.safeExtend({ password })',
    code: 'Base.safeExtend({ password: z.string().min(8) })',
    schema: Stricter,
    say: (r) => {
      if (r.success) return '✓ Longer password, and the matching rule still ran';
      return r.error.issues.some((i) => i.path.includes('confirm')) ? '✗ The inherited matching rule still fires' : '✗ The new, stricter password field fired';
    },
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Compare the plain schema with the safeExtended one.' });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  });
  if (!stage.preview) note(stage.root, `Base.extend({ password }) throws: ${extendError}`);
  return stage.dispose;
};

export default mount;
