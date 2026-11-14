// .exactPartial(): a field may be absent, but not present as undefined
import * as z from 'zod';
import type { Mount } from '@/types.ts';
import { objectLab, type ObjectVariant } from '../../shared/object-lab.ts';
import { createStage } from '../../shared/stage.ts';

const Settings = z.object({
  theme: z.enum(['dark', 'light']),
  fontSize: z.number(),
});
const Loose = Settings.partial();
const Exact = Settings.exactPartial();

const SAMPLES = [
  { label: 'theme left out', value: { fontSize: 14 } },
  { label: 'theme: undefined', value: { theme: undefined, fontSize: 14 } },
];

const VARIANTS: ObjectVariant[] = [
  { label: 'partial()', code: 'Settings.partial()', schema: Loose, say: (r) => (r.success ? '✓ Accepted: undefined counts as "not given"' : '✗ Rejected') },
  {
    label: 'exactPartial()',
    code: 'Settings.exactPartial()',
    schema: Exact,
    say: (r) => (r.success ? '✓ Accepted: the key is simply absent' : '✗ Rejected: a key that is there cannot be undefined; leave it out instead'),
  },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Leave a key out, or set it to undefined: partial and exactPartial disagree." });
  objectLab(stage, VARIANTS, SAMPLES, {
    editor: false,
    plan: [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ],
  });
  return stage.dispose;
};

export default mount;
