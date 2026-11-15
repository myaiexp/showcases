// l7 example: color(field, callback): colour by rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "color(field, callback): colour by rule",
  summary:
    "color('type', (value) => ...) runs your function on each line's field value and paints with the colour it returns.",
  section: "Line Layer",
  tags: ["color","callback","field"],
  docs: ["repo/site/docs/api/line_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
