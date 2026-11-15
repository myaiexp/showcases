// tanstack-charts example: What each axis switch hides
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What each axis switch hides',
  summary:
    'Several switches remove different parts of an axis. ticks: false removes stubs and their labels. ticks.size 0 keeps the labels but draws no stubs. axis.line false removes only the baseline. tickLabels: false removes the text. axis: false hides everything the axis draws, while a grid stays independent.',
  section: 'Scales, Guides, and Color',
  tags: ['axis', 'ticks', 'tickLabels', 'line', 'size'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
