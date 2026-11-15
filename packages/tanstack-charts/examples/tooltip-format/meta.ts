// tanstack-charts example: Plain-text tooltip with format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plain-text tooltip with format',
  summary:
    'format returns one string for the focused point and replaces the default rows. It receives the pinned flag, so the text here gets a suffix after a click. The string is plain text: markup in it is shown, not parsed.',
  section: 'Tooltips and Focus',
  tags: ['tooltip.format', 'pinned', 'ChartPoint'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
