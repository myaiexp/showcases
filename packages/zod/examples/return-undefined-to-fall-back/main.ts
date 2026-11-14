// An error function that returns undefined leaves that issue with its default message
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

// Always answers: every kind of failure gets the same words.
const Always = z.int({ error: () => 'Not a valid guest count' }).max(12);

// Answers only for too_big. Returning undefined hands control to the next error map in
// the chain, which ends at the default message. Returning { message } also works.
const OnlyBig = z
  .int({
    error: (iss) => {
      if (iss.code === 'too_big') return { message: `We seat ${iss.maximum} guests at most` };
      return undefined;
    },
  })
  .max(12);

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a guest count: only "too many" is worded by hand in the right column.',
    say: (results) => (results.every((r) => r.success) ? '✓ Valid: no message was needed' : '✗ Right: only too_big is reworded; every other failure keeps the default words'),
    codes: true,
    columns: [
      { title: 'Returns text always', code: '() => "Not a valid…"', schema: Always },
      { title: 'Returns undefined', code: 'too_big ? {…} : undefined', schema: OnlyBig },
    ],
    samples: [
      { label: '20 guests', value: 20 },
      { label: '"six"', value: 'six' },
      { label: '2.5 guests', value: 2.5 },
      { label: '8 guests', value: 8 },
    ],
  });

export default mount;
