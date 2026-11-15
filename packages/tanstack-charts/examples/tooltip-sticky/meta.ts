// tanstack-charts example: Click to pin, or turn pinning off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click to pin, or turn pinning off',
  summary:
    'By default a click, Enter or Space pins the tooltip so its text can be selected, and another click or Escape releases it. sticky false turns that off. The card clicks a point every few seconds.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.sticky', 'pinned', 'onSelect'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
