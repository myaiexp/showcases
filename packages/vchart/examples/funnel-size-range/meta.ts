// vchart example: Funnel maxSize, minSize and range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Funnel maxSize, minSize and range",
  summary:
    "maxSize and minSize bound the layer widths as percentages and range.min and range.max choose which values map to those bounds, with anything beyond clamped. Three sliders show how the layers stretch and clip.",
  section: "Funnel",
  tags: ['funnel', 'maxSize', 'minSize', 'range'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Funnel.md',
    'repo/docs/assets/option/en/series/funnel.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
