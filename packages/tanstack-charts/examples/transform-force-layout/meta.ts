// tanstack-charts example: forceLayout static settlement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "forceLayout static settlement",
  summary:
    "forceLayout runs a D3 force simulation synchronously and returns nodes with x and y plus links with resolved endpoints, so ordinary dot and link marks can draw it. The slider changes the many-body repulsion and the layout is computed again; the simulation never keeps running.",
  section: "Data Transforms",
  tags: ["forceLayout", "manyBody", "link", "dot"],
  docs: ["repo/docs/reference/transforms.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
