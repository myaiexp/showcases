// A message written into the schema wins over the error map given to one parse
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

// name has its own message; email has none.
const Contact = z.object({
  name: z.string({ error: 'Name: highest priority' }),
  email: z.email(),
});

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a contact: watch which field the per-parse words reach.',
    columns: [
      { title: 'No error map', code: 'safeParse(input)', schema: Contact },
      {
        title: 'Per-parse error map',
        code: 'safeParse(input, { error: () => "per-parse: lower" })',
        schema: { safeParse: (x) => Contact.safeParse(x, { error: () => 'per-parse: lower priority' }) },
      },
    ],
    samples: [
      { label: 'Both wrong', value: { name: 7, email: 'ada@' } },
      { label: 'Only email', value: { name: 'Ada', email: 'ada@' } },
      { label: 'Only name', value: { name: 7, email: 'ada@example.com' } },
      { label: 'Fine', value: { name: 'Ada', email: 'ada@example.com' } },
    ],
    say: (results) => (results[1]?.success ? '✓ Nothing failed, so no message was needed' : '✗ The per-parse words only reach fields the schema left unworded'),
  });

export default mount;
