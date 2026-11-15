// tanstack-charts example: Continuous cursor with labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Continuous cursor with labels',
  summary:
    'continuousCursor tracks an unsnapped x and y position over invertible scales and clamps it to the plot. Rules and the marker are on by default; xLabel and yLabel add value labels. Pointer previews stay local to the host, and the readout shows the proposals.',
  section: 'Interactions and Selections',
  tags: ['continuousCursor', 'controls', 'controlledSignal', 'xLabel', 'yLabel'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
