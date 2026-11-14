// vchart example: Heatmap: the color scale range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap: the color scale range',
  summary:
    'The heatmap\'s colors come from the chart\'s color scale: a linear scale with a range of stops, mapped from the value domain. A select swaps the range between warm, cool and diverging palettes.',
  section: 'Scatter, Heatmap and BoxPlot',
  tags: ['color.type', 'color.domain', 'color.range', 'heatmap'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Heatmap.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
