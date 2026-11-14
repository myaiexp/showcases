// observable-plot example: Plots: mark order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: mark order',
  summary:
    'Two bar marks offset by dx and dy; the mark listed last is drawn on top, and a toggle swaps the order.',
  section: 'Plots',
  tags: ['Plot.barY', 'marks', 'dx', 'dy', 'x.padding'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
