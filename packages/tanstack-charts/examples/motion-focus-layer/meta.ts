// tanstack-charts example: A focus layer during entrance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A focus layer during entrance',
  summary:
    'Inline mark states wait while entrance or data motion is active, so a focused dot would stay unchanged until motion settles. A separate whenFocused mark has its own visibility and appears at once, even while the bars are still growing. The chart is mounted again so the entrance repeats under the pointer.',
  section: 'Motion',
  tags: ['whenFocused', 'motion', 'states', 'initial'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
