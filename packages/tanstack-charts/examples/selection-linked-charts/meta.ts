// tanstack-charts example: Two charts, one selected key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two charts, one selected key',
  summary:
    'A selection key kept in application state can drive several charts. Each chart builds its own keyedSelection from the same value, so selecting a dot in the scatter highlights the product in the bar chart, and the reverse. Key policy and any status text stay in the application.',
  section: 'Interactions and Selections',
  tags: ['keyedSelection', 'whenSelected', 'controlledSignal', 'linked views'],
  docs: [
    'repo/docs/guides/interactions-and-selections.md',
    'repo/docs/reference/focus-and-interaction.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
