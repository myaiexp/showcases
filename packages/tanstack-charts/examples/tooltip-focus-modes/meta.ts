// tanstack-charts example: Five focus modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Five focus modes',
  summary:
    'The focus option picks what a pointer resolves: nearest, nearest-x, nearest-y, group-x or group-y. Grouped modes list one row per series at the shared x or y value. Pick a mode and move over the chart; the card cycles through them.',
  section: 'Tooltips and Focus',
  tags: ['focus', 'group-x', 'group-y', 'nearest-x', 'nearest-y', 'tooltip'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
