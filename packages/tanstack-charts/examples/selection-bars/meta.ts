// tanstack-charts example: Selecting a bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Selecting a bar',
  summary:
    'whenSelected works on any mark. Wrapping a copy of the bars in whenSelected paints an amber bar over the one whose key was activated, while the grey bars underneath keep their own focus and tooltip. Press Enter on a focused bar to select it from the keyboard.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'whenSelected', 'barY', 'key'],
  docs: [
    'repo/docs/guides/interactions-and-selections.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
