// l7 example: size(field): width from the data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "size(field): width from the data",
  summary:
    "size('lineSize') reads the width of every line from that field of the data, so thick and thin lines come from the rows themselves.",
  section: "Line Layer",
  tags: ["size","field"],
  docs: ["repo/site/docs/api/line_layer/size.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
