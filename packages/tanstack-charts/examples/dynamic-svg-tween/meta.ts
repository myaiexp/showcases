// tanstack-charts example: Lightweight SVG tween
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lightweight SVG tween',
  summary:
    'svgAnimation: true gives the default SVG renderer a small tween between keyed states. Bars grow and shrink to new values with no spring solver or timing cascade. Switching it off makes every update snap, which is also what static output does.',
  section: 'Dynamic Data and Animation',
  tags: ['svgAnimation', 'key', 'host.update'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
