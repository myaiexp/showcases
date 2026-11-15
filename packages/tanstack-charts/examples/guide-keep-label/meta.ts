// tanstack-charts example: Keeping a label off the tick set
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keeping a label off the tick set',
  summary:
    'thin.keep guarantees that listed values stay visible, even when they collide with each other. A kept value outside the candidate set adds only a label, not a tick stub or grid line. This UTC axis rotates its labels by -35 degrees and keeps a launch date that no tick lands on.',
  section: 'Scales, Guides, and Color',
  tags: ['axis.tickLabels.thin', 'keep', 'priority', 'minGap', 'rotate', 'scaleUtc'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
