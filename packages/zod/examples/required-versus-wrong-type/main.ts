// "Required" versus "wrong type": an error function tells a missing field from a bad one
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

const Plain = z.object({ quantity: z.number() });

// A missing field reaches the function as iss.input === undefined.
const Told = z.object({
  quantity: z.number({
    error: (iss) => (iss.input === undefined ? 'Field is required.' : 'Invalid input.'),
  }),
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick an order line: one is missing its quantity, one has the wrong kind of value.',
    say: (results) => (results.every((r) => r.success) ? '✓ Valid: no message was needed' : '✗ The function tells a missing field (iss.input is undefined) from a wrong value'),
    columns: [
      { title: 'Default', code: 'z.number()', schema: Plain },
      { title: 'Asks iss.input', code: 'iss.input === undefined ? …', schema: Told },
    ],
    samples: [
      { label: 'Missing', value: {} },
      { label: 'Text', value: { quantity: 'three' } },
      { label: 'null', value: { quantity: null } },
      { label: 'A number', value: { quantity: 3 } },
    ],
  });

export default mount;
