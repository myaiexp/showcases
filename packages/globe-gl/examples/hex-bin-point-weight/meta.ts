// globe-gl example: Hex Bin: point weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: point weight",
  summary:
    "The same points binned twice: with weight 1 each hexagon sums to a count, with hexBinPointWeight set to a field name it sums magnitudes of 1, 4, 7 or 10.",
  section: "Hex Bin Layer",
  tags: ["hexBinPointWeight", "hexAltitude", "hexTopColor", "hexSideColor"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
