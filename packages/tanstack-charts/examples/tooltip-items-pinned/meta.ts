// tanstack-charts example: More rows once the tooltip is pinned
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'More rows once the tooltip is pinned',
  summary:
    'Item text callbacks receive pinned, false while hovering and true after a click, Enter or Space. This tooltip stays short in transit and adds a detail row when pinned. Click again, press Escape or click elsewhere to release it.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.items', 'pinned', 'sticky'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
