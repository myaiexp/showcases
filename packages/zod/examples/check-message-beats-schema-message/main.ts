// A message on a check beats the schema's own; the schema's covers every check without one
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { versus } from '../../shared/refine-versus.ts';

// Schema-level: the message on z.string() also covers the schema's own checks.
const SchemaOnly = z.string('Invalid name').min(5);
// Check-level: the message on .min() is more specific and wins for that check.
const WithCheck = z.string('Invalid name').min(5, 'Too short!');

const mount: Mount = (el, ctx) =>
  versus(el, ctx, {
    hint: 'Pick a name: a number fails the type, "Ada" fails the length.',
    codes: true,
    columns: [
      { title: 'Schema-level only', code: "z.string('Invalid name').min(5)", schema: SchemaOnly },
      { title: 'Check-level too', code: "….min(5, 'Too short!')", schema: WithCheck },
    ],
    samples: [
      { label: 'A number', value: 12 },
      { label: '"Ada"', value: 'Ada' },
      { label: '"Ada Lovelace"', value: 'Ada Lovelace' },
    ],
    say: (results) => (results.every((r) => r.success) ? '✓ Long enough: no message needed' : '✗ The check\'s message beats the schema\'s; the schema\'s covers the rest'),
  });

export default mount;
