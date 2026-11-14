// observable-plot example: Plots: clip option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: clip option',
  summary:
    'A line that overflows a narrowed y domain, drawn clipped to the frame or not through the top-level clip option.',
  section: 'Plots',
  tags: ['clip', 'y.domain', 'Plot.lineY', 'Plot.frame'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
