// vchart example: Scatter: point labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scatter: point labels',
  summary:
    'label.visible adds a text beside each point, and label.position places it relative to the symbol. The text is the y value by default; formatMethod swaps it for the category. A select picks the position.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['label.visible', 'label.position', 'label.formatMethod'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Scatter.md',
    'repo/docs/assets/option/en/series/scatter.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
