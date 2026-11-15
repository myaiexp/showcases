// tanstack-charts example: Tooltip anchored to the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip anchored to the pointer',
  summary:
    'anchor pointer makes the tooltip follow the pointer instead of the focused point, which suits large shapes. The placement list tries right, left, bottom and top in turn, so it flips away from the plot edge.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.anchor', 'tooltip.placement', 'tooltip.offset'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
