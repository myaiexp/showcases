// globe-gl example: Hex Bin: points into hexagons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: points into hexagons",
  summary:
    "hexBinPointsData bins about 1,900 points around big cities into H3 hexagons at resolution 2. Each hexagon is a prism as tall as its point count times the default 0.01.",
  section: "Hex Bin Layer",
  tags: ["hexBinPointsData", "hexBinResolution"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
