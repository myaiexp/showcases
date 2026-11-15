// tanstack-charts example: One animation owner per host
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One animation owner per host',
  summary:
    'A host animates through one owner. The default SVG renderer reads svgAnimation, and motion() ignores it and reads definition motion instead. The same definition carries both: svgAnimation asks for a slow 1600 ms tween and motion asks for a quick spring. Switch renderers to see which one is obeyed.',
  section: 'Dynamic Data and Animation',
  tags: ['svgAnimation', 'motion', 'mountChart', 'mountChartRenderer'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
