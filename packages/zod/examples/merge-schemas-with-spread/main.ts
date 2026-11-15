// Spread .shape: merge two object schemas into a new one with the strictness you pick
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Contact = z.object({ name: z.string(), email: z.email() });
const Address = z.object({ street: z.string(), city: z.string() });
const Customer = z.object({ ...Contact.shape, ...Address.shape });

const SAMPLES = [
  { label: 'full customer', value: { name: 'Ada', email: 'ada@example.com', street: 'Main 1', city: 'Oslo' } },
  { label: 'no city', value: { name: 'Ada', email: 'ada@example.com', street: 'Main 1' } },
];

const half = (what: string): ((r: Parameters<NonNullable<ObjectVariant['say']>>[0], input: unknown) => string) => (r, input) =>
  r.success ? `✓ ${what} is fine; the other half's ${droppedPaths(input, r.data).join(', ')} dropped` : `✗ Missing or wrong: ${r.error.issues.map((i) => i.path.join('.')).join(', ')}`;

const VARIANTS: ObjectVariant[] = [
  { label: 'Contact', code: 'Contact = z.object({ name, email })', schema: Contact, say: half('The contact half') },
  { label: 'Address', code: 'Address = z.object({ street, city })', schema: Address, say: half('The address half') },
  {
    label: '{ ...Contact.shape, ...Address.shape }',
    code: 'z.object({ ...Contact.shape, ...Address.shape })',
    schema: Customer,
    say: (r) => (r.success ? '✓ One schema checks both halves of the record' : `✗ The merged schema needs ${r.error.issues.map((i) => i.path.join('.')).join(', ')}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Spread the shapes of two schemas into one." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
