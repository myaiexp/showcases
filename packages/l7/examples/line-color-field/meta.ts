// l7 example: color(field): colours in the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "color(field): colours in the data",
  summary:
    "color('c') takes each line's colour straight from its 'c' field, which holds colour strings.",
  section: "Line Layer",
  tags: ["color","field"],
  docs: ["repo/site/docs/api/line_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
