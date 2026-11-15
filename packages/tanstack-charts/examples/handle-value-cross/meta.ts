// tanstack-charts example: Handle track inside the plot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Handle track inside the plot',
  summary:
    'cross takes either an edge with an offset or a semantic y value. With a value, the track sits inside the plot at that height and the rule runs from the plot top down to it, which suits a threshold or a playhead drawn on the data.',
  section: 'Interactions and Selections',
  tags: ['handleX', 'cross', 'value', 'trackStyle'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
