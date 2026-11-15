// l7 example: Heatmap: source: CSV text with a parser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: source: CSV text with a parser",
  summary:
    "Text data is parsed with type 'csv', again naming the x and y columns. The CSV here is built in code.",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","source","csv","parser"],
  docs: ["repo/site/docs/api/heatmap_layer/source.en.md","repo/site/docs/api/common/layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
