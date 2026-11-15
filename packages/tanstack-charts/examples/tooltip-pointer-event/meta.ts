// tanstack-charts example: Raw pointer samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Raw pointer samples',
  summary:
    'pointerEvent pointerrawupdate asks the host for raw pointer samples instead of pointermove, where the browser exposes them, and falls back to pointermove otherwise. The readout says which stream your browser supports. Leaving the chart still clears focus.',
  section: 'Tooltips and Focus',
  tags: ['pointerEvent', 'pointerrawupdate'],
  docs: ['repo/docs/guides/tooltips-and-focus.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
