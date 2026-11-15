// .pick(): a public profile is the few fields of a user record worth showing
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  passwordHash: z.string(),
});
const PublicProfile = User.pick({ id: true, name: true });

const SAMPLES = [
  { label: 'full record', value: { id: 7, name: 'Ada', email: 'ada@example.com', passwordHash: '$2b$10$q9x…' } },
  { label: 'no email yet', value: { id: 7, name: 'Ada', passwordHash: '$2b$10$q9x…' } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'User', code: 'User = z.object({ id, name, email, passwordHash })', schema: User, say: (r) => (r.success ? '✓ The whole record, private fields included' : '✗ The full schema wants every field') },
  {
    label: 'User.pick({ id, name })',
    code: 'User.pick({ id: true, name: true })',
    schema: PublicProfile,
    say: (r, input) => (r.success ? `✓ Public profile only: ${droppedPaths(input, r.data).join(', ')} left out` : '✗ A public field is wrong'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Same record, two schemas: pick keeps only what you name." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [1, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
