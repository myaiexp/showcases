// l7 example: shape('flowline'): two-way flows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('flowline'): two-way flows",
  summary:
    "shape('flowline') (new in 2.17) draws a line pair for each from-to row, so A to B and B to A sit side by side. gapWidth is the distance between them.",
  section: "Line Layer",
  tags: ["shape","shape('flowline')","LineLayer"],
  docs: ["repo/site/docs/api/line_layer/shape.en.md","repo/site/docs/api/line_layer/linelayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
