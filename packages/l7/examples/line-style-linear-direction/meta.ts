// l7 example: style: linearDir
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "style: linearDir",
  summary:
    "sourceColor and targetColor set a gradient; linearDir picks where it runs: 'vertical' goes along the line's direction, 'horizontal' across its width.",
  section: "Line Layer",
  tags: ["style","linearDir","sourceColor","targetColor","ILinearDir"],
  docs: ["repo/site/docs/api/line_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
