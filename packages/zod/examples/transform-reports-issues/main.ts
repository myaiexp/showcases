// A transform that converts text to a number and reports an issue when it cannot
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { liveText } from '../../shared/live-text.ts';

const Quantity = z.string().transform((text, ctx) => {
  const n = Number(text);
  if (text.trim() === '' || Number.isNaN(n)) {
    ctx.issues.push({ code: 'custom', message: `"${text}" is not a number`, input: text });
    // z.NEVER exits the transform without changing the output type.
    return z.NEVER;
  }
  return n;
});

const mount: Mount = (el, ctx) =>
  liveText(el, ctx, {
    code: 'z.string().transform((t, ctx) => { …ctx.issues.push(…); return z.NEVER })',
    schema: Quantity,
    samples: ['42', '3.5', 'tuna', ' '],
    typed: ['42', 'tuna', '3.5'],
    types: true,
    placeholder: 'a quantity',
    say: (text, r) => (!text ? 'Type a number, or click a sample' : r.success ? `✓ "${text}" became the number ${String(r.data)}` : `✗ The transform pushed an issue: ${r.error.issues[0]!.message}`),
  });

export default mount;
