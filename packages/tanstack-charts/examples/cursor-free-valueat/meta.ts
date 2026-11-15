// tanstack-charts example: valueAt snaps a free cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'valueAt snaps a free cursor',
  summary:
    'By default a free cursor inverts the scale exactly. valueAt on an axis replaces that: here x rounds to a whole number and y returns undefined, so the y axis stays coordinate-only. The controller then holds whole-number x values.',
  section: 'Interactions and Selections',
  tags: ['valueAt', 'free', 'cursorHost', 'ChartCursorAxisContext'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
