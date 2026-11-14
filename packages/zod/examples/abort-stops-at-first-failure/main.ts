// The same three password rules with and without abort: every failure vs only the first
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const rules = (abort: boolean) =>
  z
    .string()
    .refine((v) => v.length >= 8, { error: 'At least 8 characters', abort })
    .refine((v) => /\d/.test(v), { error: 'Needs a digit', abort })
    .refine((v) => v === v.toLowerCase(), { error: 'Must be lowercase', abort });

const collectAll = rules(false);
const stopEarly = rules(true);

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Edit the JSON text: the left column lists every broken rule, the right one stops at the first.',
    columns: [
      { title: 'Default', code: 'refine(rule, { error })', schema: collectAll },
      { title: 'abort: true', code: 'refine(rule, { error, abort: true })', schema: stopEarly },
    ],
    samples: [
      { label: 'OH NO', value: 'OH NO' },
      { label: 'password', value: 'password' },
      { label: 'Password1', value: 'Password1' },
      { label: 'tea-time-9', value: 'tea-time-9' },
    ],
    say: ([all, first]) => {
      if (all?.success) return '✓ Every rule is satisfied: abort changes nothing';
      const n = all && !all.success ? all.error.issues.length : 0;
      return n > 1 ? `Default reports ${n} problems at once; abort: true reports only the first` : 'Only one rule fails, so both columns agree';
    },
  });

export default mount;
