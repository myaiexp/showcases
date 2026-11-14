// vchart example: Grouped circular progress with an indicator
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grouped circular progress with an indicator",
  summary:
    "Several categories in a circularProgress chart nest as concentric rings, coloured by seriesField, with roundCap, progress padding, a band radius axis, a legend and an indicator card that follows hover. The preview updates all three rings.",
  section: "Gauge, Progress and Liquid",
  tags: ['circularProgress', 'seriesField', 'roundCap', 'indicator', 'axes', 'legends'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Progress.md',
    'repo/docs/assets/option/en/series/circular-progress.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
