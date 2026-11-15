// tanstack-charts example: select first, last, min, max
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "select first, last, min, max",
  summary:
    "select returns whole original rows, unchanged, chosen by method. Per region, the first, last, lowest or highest order by amount is picked from the rows and drawn as a dot over all the orders in grey. A function method can also return several indexes.",
  section: "Data Transforms",
  tags: ["select", "first", "last", "min", "max", "dot"],
  docs: [
    'repo/docs/reference/transforms.md',
    'repo/docs/reference/marks/dot-and-hexagon.md',
    'repo/docs/concepts/scales-and-d3.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
