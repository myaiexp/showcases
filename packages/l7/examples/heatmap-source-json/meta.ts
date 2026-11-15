// l7 example: Heatmap: source: JSON rows with a parser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap: source: JSON rows with a parser",
  summary:
    "JSON data is an array of objects: the parser names which fields hold x (longitude) and y (latitude).",
  section: "Heatmap Layer",
  tags: ["HeatmapLayer","source","json","parser"],
  docs: ["repo/site/docs/api/heatmap_layer/source.en.md","repo/site/docs/api/common/layer/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
