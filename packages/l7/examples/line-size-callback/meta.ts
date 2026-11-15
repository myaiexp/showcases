// l7 example: size(field, callback): width by rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field, callback): width by rule",
  summary:
    "size('type', (value) => ...) calls your function with the field value and uses what it returns as the width: here moves out are 1px, moves in 3px and transit 6px.",
  section: "Line Layer",
  tags: ["size","callback","field"],
  docs: ["repo/site/docs/api/line_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
