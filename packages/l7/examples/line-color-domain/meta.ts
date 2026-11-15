// l7 example: color(field, colours): palette by value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "color(field, colours): palette by value",
  summary:
    "color('type', [...]) assigns the colours in the list to the field's values in turn: three kinds of route, three colours.",
  section: "Line Layer",
  tags: ["color","domain","field"],
  docs: ["repo/site/docs/api/line_layer/color.en.md","repo/site/docs/api/common/layer/color.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
