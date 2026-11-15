// l7 example: shape('simple'): one-pixel lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('simple'): one-pixel lines",
  summary:
    "shape('simple') draws hairlines, always 1px wide: size(10) has no effect. It is the cheap choice for very many segments. Drag the slider to see size being ignored.",
  section: "Line Layer",
  tags: ["shape","shape('simple')","LineLayer"],
  docs: ["repo/site/docs/api/line_layer/shape.en.md","repo/site/docs/api/line_layer/linelayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
