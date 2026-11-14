// Tippy.js example: inertia gives the scale animation a springy overshoot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A springy pop',
  summary:
    'Switch on inertia and the tip overshoots its size and settles back, like a spring. The first button has it off for comparison; the third has the spring curve tuned in CSS to bounce harder.',
  section: 'Animations',
  tags: ['inertia', 'animation', 'scale', 'duration', 'transition-timing-function'],
  docs: ['repo/website/src/pages/v6/animations.mdx', 'repo/website/src/pages/index.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
