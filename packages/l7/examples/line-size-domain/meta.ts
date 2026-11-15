// l7 example: size(field, values): widths by value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field, values): widths by value",
  summary:
    "size('count', [1, 2, 4, 8]) maps the field's range onto the widths in the list: busier routes become thicker.",
  section: "Line Layer",
  tags: ["size","domain","field"],
  docs: ["repo/site/docs/api/line_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
