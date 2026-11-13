// echarts example: Treemap gaps, borders and border saturation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap gaps, borders and border saturation",
  summary:
    "How a treemap tells levels apart: gapWidth between children, borderWidth, borderRadius, and borderColorSaturation, which derives each border from the node colour instead of one fixed borderColor.",
  section: 'Option: series.treemap',
  tags: ['treemap', 'levels', 'itemStyle.gapWidth', 'itemStyle.borderWidth', 'itemStyle.borderColor', 'itemStyle.borderColorSaturation', 'itemStyle.borderRadius'],
  docs: ['repo/en/option/series/treemap.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
