// .check() pushing issues by hand: without continue later rules are skipped, with it they run
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const tagRules = (keepGoing: boolean) =>
  z
    .array(z.string())
    .check((ctx) => {
      if (ctx.value.length > 3) {
        ctx.issues.push({ code: 'too_big', maximum: 3, origin: 'array', inclusive: true, message: 'Too many items', input: ctx.value, continue: keepGoing });
      }
      if (ctx.value.length !== new Set(ctx.value).size) {
        ctx.issues.push({ code: 'custom', message: 'No duplicates allowed.', input: ctx.value, continue: keepGoing });
      }
    })
    // A later rule: it only runs when the issues above were marked continuable.
    .refine((v) => v.every((t) => t === t.toLowerCase()), { error: 'Tags must be lowercase' });

const stops = tagRules(false);
const goesOn = tagRules(true);

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    codes: true,
    cardIssues: 3,
    hint: 'Edit the tags: the lowercase rule comes after the check() and only runs on the right.',
    columns: [
      { title: 'continue unset', code: 'issues.push({ …issue })', schema: stops },
      { title: 'continue: true', code: 'issues.push({ …issue, continue: true })', schema: goesOn },
    ],
    samples: [
      { label: 'long, repeating, capitals', value: ['Tea', 'Tea', 'mug', 'cup'] },
      { label: 'repeat + capital', value: ['Tea', 'Tea'] },
      { label: 'capital only', value: ['Tea', 'mug'] },
    ],
    say: ([a, b]) => {
      const x = a && !a.success ? a.error.issues.length : 0;
      const y = b && !b.success ? b.error.issues.length : 0;
      return y > x ? `continue: true let the lowercase rule run too: ${y} issues instead of ${x}` : 'Both columns report the same issues';
    },
  });

export default mount;
