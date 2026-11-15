// l7 example: style: blur on a line
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style: blur on a line",
  summary:
    "blur takes three numbers that set how much the line fades towards its edge. Move them from [1, 1, 1] towards a soft glow.",
  section: "Line Layer",
  tags: ["style","blur","shape('line')"],
  docs: ["repo/site/docs/api/line_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
