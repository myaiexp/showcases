// l7 example: flowline style: opacity mapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "flowline style: opacity mapping",
  summary:
    "A flowline's opacity can be data-driven: style({ opacity: { field: 'count', value: [0.2, 0.4, 0.6, 0.8] } }) is like color('count', [...]).",
  section: "Line Layer",
  tags: ["style","opacity","field","shape('flowline')"],
  docs: ["repo/site/docs/api/line_layer/style.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
