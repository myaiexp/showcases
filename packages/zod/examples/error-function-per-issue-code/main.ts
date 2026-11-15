// One error function gives each kind of failure its own words, by looking at iss.code
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const Plain = z.object({ password: z.string().min(8) });

// The function runs when a parse fails. iss.code says what kind of failure it is,
// iss.input is what was received (undefined when the field was left out).
const ByCode = z.object({
  password: z
    .string({
      error: (iss) => {
        if (iss.code === 'invalid_type') return iss.input === undefined ? 'Choose a password' : 'A password is text';
        if (iss.code === 'too_small') return 'That password is too short';
        return undefined;
      },
    })
    .min(8),
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a sign-up: the kind of failure decides which words appear.',
    say: (results) => (results.every((r) => r.success) ? '✓ Valid: no message was needed' : '✗ The right column words each kind of failure by its issue code'),
    codes: true,
    columns: [
      { title: 'Default messages', code: 'z.string().min(8)', schema: Plain },
      { title: 'error: (iss) => …', code: 'if (iss.code === "too_small")…', schema: ByCode },
    ],
    samples: [
      { label: 'Left out', value: {} },
      { label: 'A number', value: { password: 12345678 } },
      { label: 'Too short', value: { password: 'hunter2' } },
      { label: 'Fine', value: { password: 'correct horse' } },
    ],
  });

export default mount;
