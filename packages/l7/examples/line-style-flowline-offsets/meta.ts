// l7 example: flowline style: offsets mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "flowline style: offsets mapping",
  summary:
    "offsets [start, end] shortens a flowline at both ends so lines stop short of the cities; it can come from a field with values() returning the pair for each row.",
  section: "Line Layer",
  tags: ["style","offsets","field","values","shape('flowline')"],
  docs: ["repo/site/docs/api/line_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
