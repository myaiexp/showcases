// tanstack-charts example: Detail only after activation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Detail only after activation',
  summary:
    'visibility pinned styles the chart on focus without opening a transient tooltip. The tooltip element appears only after a click, Enter or Space, which suits detail that should be deliberate. The focus ring still follows the pointer.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.visibility', 'pinned', 'focus'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
