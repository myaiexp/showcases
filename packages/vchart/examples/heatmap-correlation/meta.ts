// vchart example: Heatmap: correlation matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap: correlation matrix',
  summary:
    'A heatmap series needs two band axes and a valueField; the cell fill reads the value through a linear color scale, and a continuous color legend shows the mapping. New coefficients arrive on a timer.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['heatmap', 'valueField', 'cell.style.fill', 'color', 'legends.type'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Heatmap.md',
    'repo/docs/assets/option/en/series/heatmap.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
