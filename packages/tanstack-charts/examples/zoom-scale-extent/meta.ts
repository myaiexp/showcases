// tanstack-charts example: Limiting the zoom factor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Limiting the zoom factor',
  summary:
    'scaleExtent is [1, maximum]: the first value must be 1 and the second caps how far in the user can zoom relative to the full extent. The slider rebuilds the control with a new cap, and the readout shows the current zoom factor, the extent length divided by the window length.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'scaleExtent', 'extent', 'zoom factor'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
