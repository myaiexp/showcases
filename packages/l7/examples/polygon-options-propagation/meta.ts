// l7 example: Polygon: Layer option enablePropagation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer option enablePropagation",
  summary:
    "By default only the top layer hears pointer events. With enablePropagation on the top layer they pass through to the one under it.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","enablePropagation","mousemove"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
