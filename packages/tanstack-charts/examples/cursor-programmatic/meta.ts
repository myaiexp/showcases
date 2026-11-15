// tanstack-charts example: Setting the cursor from another control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Setting the cursor from another control',
  summary:
    'A cursor controller is plain state with getState, setState and subscribe. Writing a value-anchored state moves the crosshair, focus and tooltip with no pointer involved, so a slider or a table can drive the chart. Passing null clears it.',
  section: 'Interactions and Selections',
  tags: ['createChartCursor', 'setState', 'anchor', 'subscribe', 'pinned'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
