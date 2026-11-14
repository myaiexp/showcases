// A password-match refine that is skipped by an unrelated field error, and one saved by when
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const base = z.object({
  password: z.string().min(8),
  confirm: z.string(),
  newsletter: z.boolean(),
});

const matches = (d: { password: string; confirm: string }): boolean => d.password === d.confirm;

const skipped = base.refine(matches, { error: 'Passwords do not match', path: ['confirm'] });
const runs = base.refine(matches, {
  error: 'Passwords do not match',
  path: ['confirm'],
  // Run whenever password and confirm themselves are valid, whatever the other fields say.
  when(payload) {
    return base.pick({ password: true, confirm: true }).safeParse(payload.value).success;
  },
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Edit the JSON: break newsletter and the passwords at the same time.',
    columns: [
      { title: 'Default', code: 'refine(matches, { path })', schema: skipped },
      { title: 'With when', code: 'refine(matches, { path, when })', schema: runs },
    ],
    samples: [
      { label: 'newsletter wrong', value: { password: 'tea-time-9', confirm: 'tea-time', newsletter: 'maybe' } },
      { label: 'only mismatch', value: { password: 'tea-time-9', confirm: 'tea-time', newsletter: true } },
      { label: 'password too short', value: { password: 'tea', confirm: 'cup', newsletter: 'maybe' } },
    ],
    say: ([plain, withWhen]) => {
      const a = plain && !plain.success ? plain.error.issues.length : 0;
      const b = withWhen && !withWhen.success ? withWhen.error.issues.length : 0;
      return b > a ? 'The default column never ran the match check; when made it run' : 'Both versions report the same issues';
    },
  });

export default mount;
