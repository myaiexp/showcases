// tanstack-charts example: A free cursor with inverted values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A free cursor with inverted values',
  summary:
    'In free mode the cursor follows plot coordinates with no datum. The host stores normalised coordinates and inverts them through each resolved scale, so the controller holds semantic x and y values. The readout reads them back from controller.getState.',
  section: 'Interactions and Selections',
  tags: ['cursorHost', 'free', 'createChartCursor', 'getState', 'crosshair', 'marker'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
