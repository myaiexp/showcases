// tanstack-charts example: A playhead with play and pause
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A playhead with play and pause',
  summary:
    'The chart owns the handle mechanics; the application owns the clock. A timer advances the controlled value one candidate at a time while playing, and a drag or key press moves it directly. Play, pause and status text are ordinary controls beside the chart.',
  section: 'Interactions and Selections',
  tags: ['handleX', 'playback', 'controlledSignal', 'timer'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
