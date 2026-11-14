// observable-plot example: Plots: layered stock lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: layered stock lines',
  summary:
    'Two stocks drawn either as two line marks with literal colors or as one mark over a combined table, where a Symbol column feeds the color scale and legend.',
  section: 'Plots',
  tags: ['Plot.lineY', 'Plot.ruleY', 'marks', 'stroke', 'color.legend'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
