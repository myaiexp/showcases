// .required(): optional fields become mandatory, all of them or a chosen few
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Profile = z.object({
  name: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});
const AllRequired = Profile.required();
const BioRequired = Profile.required({ bio: true });

const SAMPLES = [
  { label: 'just a name', value: { name: 'Ada' } },
  { label: 'name and bio', value: { name: 'Ada', bio: 'Tea nerd' } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'Profile', code: 'Profile = z.object({ name, bio?, avatar? })', schema: Profile, say: () => '✓ Optional fields may be left out' },
  { label: 'required()', code: 'Profile.required()', schema: AllRequired, say: (r) => (r.success ? '✓ Everything is there' : `✗ Now mandatory: ${r.error.issues.map((i) => i.path.join('.')).join(', ')}`) },
  {
    label: 'required({ bio })',
    code: 'Profile.required({ bio: true })',
    schema: BioRequired,
    say: (r) => (r.success ? '✓ bio is there, and avatar may still be left out' : `✗ Now mandatory: ${r.error.issues.map((i) => i.path.join('.')).join(', ')}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Same two profiles through three versions of one schema." });
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
