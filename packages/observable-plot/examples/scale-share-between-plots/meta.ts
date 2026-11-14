// observable-plot example: Scales: sharing a scale between plots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scales: sharing a scale between plots',
  summary:
    'The second plot reuses the first plot color scale through plot.scale(\"color\"), so species keep their colors even when one is missing.',
  section: 'Scales',
  tags: ['plot.scale', 'color', 'dot'],
  docs: ['repo/docs/features/scales.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
