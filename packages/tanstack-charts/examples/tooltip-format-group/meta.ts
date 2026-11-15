// tanstack-charts example: Plain-text group tooltip with formatGroup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plain-text group tooltip with formatGroup',
  summary:
    'formatGroup builds one string for a whole focus group. Here a heading line is followed by one line per series, joined with newlines, which the tooltip preserves.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.formatGroup', 'group-x', 'groupLabel'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
