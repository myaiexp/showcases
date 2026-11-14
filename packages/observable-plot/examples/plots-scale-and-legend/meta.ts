// observable-plot example: Plots: plot.scale and plot.legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plots: plot.scale and plot.legend',
  summary:
    'Reads the color scale of a rendered plot with plot.scale("color") and draws its legend with plot.legend("color").',
  section: 'Plots',
  tags: ['plot.scale', 'plot.legend', 'Plot.dot', 'stroke'],
  docs: ['repo/docs/features/plots.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
