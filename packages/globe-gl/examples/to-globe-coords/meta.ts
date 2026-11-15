// globe-gl example: Utility: toGlobeCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: toGlobeCoords",
  summary:
    "toGlobeCoords(x, y) returns the { lat, lng } on the globe's surface under a canvas pixel, or null where the pixel misses the globe. The readout and a red column follow the mouse; the card sweeps a probe back and forth across the edge.",
  section: "Utility",
  tags: ["toGlobeCoords", "pointsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
