// tanstack-charts example: Structured content with title and rows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Structured content with title and rows',
  summary:
    'content returns a safe title and rows of label, value and colour, and takes precedence over format and the automatic rows. Setting active on the row for the primary point gives it the bold, shaded look.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.content', 'active', 'primaryPoint', 'formatY'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
