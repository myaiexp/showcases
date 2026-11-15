// An error map passed to safeParse words one parse without touching the schema
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

// One schema, no messages of its own.
const Order = z.object({ item: z.string(), quantity: z.number().min(1) });

const forStaff = (iss: z.core.$ZodRawIssue): string | undefined => {
  if (iss.code === 'invalid_type') return `staff: ${String(iss.expected)} needed`;
  if (iss.code === 'too_small') return `staff: at least ${String(iss.minimum)}`;
  return undefined;
};

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick an order: the schema is the same, only the second parse carries an error map.',
    say: (results) => (results.every((r) => r.success) ? '✓ Valid: no message was needed' : '✗ The error map words this one parse; the schema itself is unchanged'),
    columns: [
      { title: 'Order.safeParse(x)', code: 'safeParse(input)', schema: Order },
      { title: 'With an error map', code: 'safeParse(input, { error })', schema: { safeParse: (x) => Order.safeParse(x, { error: forStaff }) } },
    ],
    samples: [
      { label: 'Zero quantity', value: { item: 'tea', quantity: 0 } },
      { label: 'Nothing', value: {} },
      { label: 'Text quantity', value: { item: 'tea', quantity: 'two' } },
      { label: 'Good order', value: { item: 'tea', quantity: 2 } },
    ],
  });

export default mount;
