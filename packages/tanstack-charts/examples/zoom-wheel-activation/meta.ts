// tanstack-charts example: When the wheel zooms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When the wheel zooms',
  summary:
    'wheelActivation decides when the plot may capture the wheel. focus, the default, captures it only after the plot is focused; modifier needs Control or Command; always captures every wheel over the plot and traps page scrolling. The card sends wheel events to a chart set to always.',
  section: 'Interactions and Selections',
  tags: ['zoomX', 'wheelActivation', 'focus', 'modifier', 'always'],
  docs: ['repo/docs/guides/interactions-and-selections.md', 'repo/docs/reference/focus-and-interaction.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
