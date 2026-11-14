// vchart example: Heatmap: cell labels and gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap: cell labels and gaps',
  summary:
    'label.visible prints the value inside each cell, cell.style.cornerRadius and a stroke separate the cells, and cellBackground draws a track behind them. A slider changes the corner radius.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['label', 'cell.style.cornerRadius', 'cellBackground', 'heatmap'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Heatmap.md',
    'repo/docs/assets/option/en/series/heatmap.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
