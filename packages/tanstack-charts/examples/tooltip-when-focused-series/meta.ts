// tanstack-charts example: Highlight the focused series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Highlight the focused series',
  summary:
    'A thicker copy of the lines wrapped in whenFocused with match series appears only for the series under the pointer, so the others stay as thin context lines.',
  section: 'Tooltips and Focus',
  tags: ['whenFocused', 'match', 'lineY', 'focus'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
