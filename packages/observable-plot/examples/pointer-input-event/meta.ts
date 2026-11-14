// observable-plot example: Pointer: input events and plot.value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pointer: input events and plot.value',
  summary:
    'A plot with a pointer transform fires input events and sets plot.value to the focused data; the row is printed under the chart.',
  section: 'Interaction: Pointer',
  tags: ['dot', 'pointerX', 'input'],
  docs: ['repo/docs/interactions/pointer.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
