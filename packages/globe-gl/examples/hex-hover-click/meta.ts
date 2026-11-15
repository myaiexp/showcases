// globe-gl example: Hex Bin: hover and click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: hover and click",
  summary:
    "hexLabel supplies a tooltip with each hexagon's point count, weight and H3 index; onHexHover lifts and whitens the hexagon under the pointer, and onHexClick flies to it.",
  section: "Hex Bin Layer",
  tags: ["hexLabel", "onHexHover", "onHexClick", "pointOfView"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
