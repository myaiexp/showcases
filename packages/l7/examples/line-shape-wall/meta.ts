// l7 example: shape('wall'): vertical fence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "shape('wall'): vertical fence",
  summary:
    "shape('wall') stands the line up as a fence; size is its height. Needs a pitched camera, and sourceColor to targetColor fades it from the ground up.",
  section: "Line Layer",
  tags: ["shape","shape('wall')","LineLayer"],
  docs: ["repo/site/docs/api/line_layer/shape.en.md","repo/site/docs/api/line_layer/linelayer.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
