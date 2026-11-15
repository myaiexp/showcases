// globe-gl example: Hex Bin: resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: resolution",
  summary:
    "hexBinResolution chooses the H3 level from 0 (122 huge cells) to 4 (the default, tiny cells). A slider moves between levels and the hexagons re-bin the same points.",
  section: "Hex Bin Layer",
  tags: ["hexBinResolution", "hexAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
