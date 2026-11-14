// tanstack-charts example: Overlap between ridges
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlap between ridges',
  summary:
    'overlap is the peak height in category-step units: 1 reaches the next baseline, below 1 leaves a gap and above 1 lets ridges cover each other, with later categories on top. The point scale padding must be at least the overlap to keep peaks inside the plot, so the slider sets both.',
  section: 'Ridgeline Marks',
  tags: ['ridgelineY', 'overlap', 'padding'],
  docs: ['repo/docs/reference/marks/ridgeline.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
