// observable-plot example: Crosshair: scatterplot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair: scatterplot',
  summary:
    'A crosshair on a penguin scatterplot shows the x and y of the nearest dot on the frame edges.',
  section: 'Interaction: Crosshair',
  tags: ['crosshair', 'dot'],
  docs: ['repo/docs/interactions/crosshair.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
