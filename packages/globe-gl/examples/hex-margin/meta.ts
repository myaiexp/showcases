// globe-gl example: Hex Bin: margin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: margin",
  summary:
    "hexMargin as a constant (slider) leaves a gap between neighbouring hexagons; as a function of the hexagon's sumWeight it shrinks the busy ones most.",
  section: "Hex Bin Layer",
  tags: ["hexMargin", "hexAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
