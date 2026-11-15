// tanstack-charts example: A pinned cursor outlives its chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A pinned cursor outlives its chart',
  summary:
    'The cursor controller owns no DOM, so pinned state survives host.destroy. Pin a point, press Remount, and the new host paints the same crosshair and tooltip from the controller. Unpinned state is cleared only if the destroyed host published it last.',
  section: 'Interactions and Selections',
  tags: ['createChartCursor', 'pin', 'destroy', 'lifecycle', 'getState'],
  docs: [
    'repo/docs/guides/interactions-and-selections.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
