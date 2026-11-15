// l7 example: Polygon: Layer option pickingBuffer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygon: Layer option pickingBuffer",
  summary:
    "A thin outline is hard to hit. pickingBuffer widens the area around each element that counts as a hit: hover just beside a border.",
  section: "Polygon Layer",
  tags: ["PolygonLayer","options","pickingBuffer","line","active"],
  docs: ["repo/site/docs/api/polygon_layer/options.en.md","repo/site/docs/api/common/layer/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
