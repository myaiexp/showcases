// l7 example: shape('arc'): bezier arcs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('arc'): bezier arcs",
  summary:
    "shape('arc') bends each from-to pair into a plane arc computed with a Bezier curve. animate() sends a trail along each one.",
  section: "Line Layer",
  tags: ["shape","shape('arc')","LineLayer"],
  docs: ["repo/site/docs/api/line_layer/shape.en.md","repo/site/docs/api/line_layer/linelayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
