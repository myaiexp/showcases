// tanstack-charts example: Zoom and pan a numeric window
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom and pan a numeric window',
  summary:
    'zoomX turns wheel, drag, touch and keyboard input into complete window proposals over a full extent, limited by scaleExtent. The application keeps the window and gives the x scale that same domain. Focus the plot and use the wheel, drag to pan, plus and minus, the arrow keys, and Home to reset.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'ZoomXWindow', 'extent', 'scaleExtent', 'clip', 'controlledSignal'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
