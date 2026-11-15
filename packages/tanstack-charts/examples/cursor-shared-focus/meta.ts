// tanstack-charts example: Two charts share one focus cursor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two charts share one focus cursor',
  summary:
    'A createChartCursor controller shared by two definitions with mode focus and match x publishes the focused date, not pixels. Each chart maps that date through its own scales, so hovering requests moves the crosshair and tooltip on the error chart too, even though their y scales differ.',
  section: 'Interactions and Selections',
  tags: ['createChartCursor', 'cursorHost', 'match', 'crosshair', 'focus'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
