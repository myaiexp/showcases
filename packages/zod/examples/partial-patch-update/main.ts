// .partial(): every field becomes optional, so a PATCH sends only what changed
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Profile = z.object({
  name: z.string().min(1),
  email: z.email(),
  bio: z.string().max(40),
});
const ProfilePatch = Profile.partial();

const SAMPLES = [
  { label: 'just the bio', value: { bio: 'Tea nerd' } },
  { label: 'a bad email', value: { email: 'ada@' } },
  { label: 'nothing at all', value: {} },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'Profile', code: 'Profile = z.object({ name, email, bio })', schema: Profile },
  {
    label: 'Profile.partial()',
    code: 'Profile.partial()',
    schema: ProfilePatch,
    say: (r) => (r.success ? '✓ Fine: nothing required, and what was sent is valid' : '✗ Optional does not mean unchecked: what is sent must still be valid'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Same three bodies for a full save and for a PATCH." });
  objectLab(stage, VARIANTS, SAMPLES, {
    plan: [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
  });
  return stage.dispose;
};

export default mount;
