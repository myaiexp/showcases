// tanstack-charts example: Fit the y axis to the zoom window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit the y axis to the zoom window',
  summary:
    'zoomX only controls x. What to do with y is application policy: here each accepted window recomputes the y domain from the rows now visible, so a zoomed-in stretch fills the plot height. Untick the box to keep a fixed y domain.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'y-domain policy', 'visible rows', 'controlledSignal'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
