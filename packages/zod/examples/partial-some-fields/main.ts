// .partial({ keys }): only the named fields become optional
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Contact = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  company: z.string(),
});
const AllOptional = Contact.partial();
const SomeOptional = Contact.partial({ phone: true, company: true });

const SAMPLES = [
  { label: 'name and email', value: { name: 'Ada', email: 'ada@example.com' } },
  { label: 'phone only', value: { phone: '+358401234567' } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'Contact', code: 'Contact = z.object({ name, email, phone, company })', schema: Contact },
  { label: 'partial()', code: 'Contact.partial()', schema: AllOptional, say: (r) => (r.success ? '✓ Everything is optional, so even this passes' : '✗ Rejected') },
  {
    label: 'partial({ phone, company })',
    code: 'Contact.partial({ phone: true, company: true })',
    schema: SomeOptional,
    say: (r) => (r.success ? '✓ phone and company may be left out' : `✗ Still required: ${r.error.issues.map((i) => i.path.join('.')).join(', ')}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Three versions of one contact schema." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [2, 0],
      [1, 1],
      [2, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
