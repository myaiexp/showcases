// l7 example: style: lineType and dashArray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style: lineType and dashArray",
  summary:
    "lineType: 'dash' turns on the dashed line and dashArray [len1, len2] is the solid length and the gap. Try [10, 2] against [2, 10].",
  section: "Line Layer",
  tags: ["style","lineType","dashArray","ILineType","IDashArray"],
  docs: ["repo/site/docs/api/line_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
