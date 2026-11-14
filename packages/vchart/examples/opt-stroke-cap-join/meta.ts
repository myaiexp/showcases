// vchart example: Stroke: lineCap, lineJoin and miterLimit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stroke: lineCap, lineJoin and miterLimit",
  summary:
    "The same zig-zag path drawn with each lineCap and lineJoin value as a thick custom path mark. A slider changes lineWidth and the miterLimit shows when miter joins turn into bevels.",
  section: "Option: Marks and Graphics",
  tags: ["lineCap","lineJoin","miterLimit","lineWidth","path"],
  docs: [
    'repo/docs/assets/option/en/graphic/stroke-style.md',
    'repo/docs/assets/option/en/graphic/partial-stroke-style.md',
    'repo/docs/assets/option/en/common/custom-mark.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
