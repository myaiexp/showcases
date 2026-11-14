// vchart example: customMark polygon: shapes from point lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "customMark polygon: shapes from point lists",
  summary:
    "A custom polygon mark takes a points array of {x, y}. Six polygons, a triangle, a hexagon, a star and more, are built from point lists around each cell centre and turn slowly as their points are recomputed.",
  section: "Option: Common",
  tags: ["customMark","polygon","points","fill","stroke"],
  docs: [
    'repo/docs/assets/option/en/common/custom-mark.md',
    'repo/docs/assets/option/en/graphic/polygon.md',
    'repo/docs/assets/option/en/graphic/attribute.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
