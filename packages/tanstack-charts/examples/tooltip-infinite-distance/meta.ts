// tanstack-charts example: Unbounded distance for a snapped cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unbounded distance for a snapped cursor',
  summary:
    'On sparse data the default 48px limit leaves gaps with no focus. maxFocusDistance set to Infinity makes group-x always snap to the closest category, so a crosshair never disappears while the pointer is over the plot.',
  section: 'Tooltips and Focus',
  tags: ['maxFocusDistance', 'group-x', 'crosshair', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/guides/interactions-and-selections.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
