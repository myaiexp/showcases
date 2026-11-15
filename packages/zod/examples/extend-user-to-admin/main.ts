// .extend(): an Admin is a User plus a role and permissions
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { droppedPaths, objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const User = z.object({ name: z.string(), email: z.email() });
const Admin = User.extend({
  role: z.literal('admin'),
  permissions: z.array(z.string()).min(1),
});

const SAMPLES = [
  { label: 'admin record', value: { name: 'Ada', email: 'ada@example.com', role: 'admin', permissions: ['users:write'] } },
  { label: 'plain user', value: { name: 'Bo', email: 'bo@example.com' } },
  { label: 'no permissions', value: { name: 'Ada', email: 'ada@example.com', role: 'admin', permissions: [] } },
];

const VARIANTS: ObjectVariant[] = [
  {
    label: 'User',
    code: 'User = z.object({ name, email })',
    schema: User,
    say: (r, input) => (r.success ? `✓ A valid User${droppedPaths(input, r.data).length ? `; the admin-only ${droppedPaths(input, r.data).join(', ')} dropped` : ''}` : '✗ Not a valid User'),
  },
  {
    label: 'Admin = User.extend(…)',
    code: 'Admin = User.extend({ role, permissions })',
    schema: Admin,
    say: (r) => (r.success ? '✓ A valid Admin: User\'s fields plus the new ones' : `✗ ${r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run each record past both schemas, or edit it.' });
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
