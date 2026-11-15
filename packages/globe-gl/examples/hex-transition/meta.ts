// globe-gl example: Hex Bin: transition duration
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hex Bin: transition duration",
  summary:
    "When hexBinPointsData is replaced every four seconds, hexTransitionDuration animates hexagons to their new altitudes and grows new ones from the ground. A slider sets the duration.",
  section: "Hex Bin Layer",
  tags: ["hexTransitionDuration", "hexBinPointsData", "hexAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
