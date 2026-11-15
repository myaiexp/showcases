// tanstack-charts example: Crosshair follows focus
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair follows focus',
  summary:
    'A crosshair mark draws a guide wherever chart focus is. With nearest-x focus and an unbounded distance, one vertical rule with a week label snaps from point to point, for pointer and keyboard alike.',
  section: 'Tooltips and Focus',
  tags: ['crosshair', 'focus', 'maxFocusDistance', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
