// penrose example: mod as a clock hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'mod as a clock hand',
  summary:
    'A sampled number of hours `h` is wrapped to the 12-hour dial with `mod(h, 12)`, which sets the angle of the hand. The long grey hand turns by the unwrapped `h` instead, so the difference is every full turn that `mod` throws away.',
  section: 'Computation: Math',
  tags: ['mod', 'unitVector', 'toRadians'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
