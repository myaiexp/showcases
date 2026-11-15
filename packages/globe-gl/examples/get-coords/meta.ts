// globe-gl example: Utility: getCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: getCoords",
  summary:
    "getCoords(lat, lng, altitude) returns the cartesian { x, y, z } of a place, in scene units. Red cones added straight to the Three.js scene are placed this way at every city and bob above the surface by asking for a changing altitude.",
  section: "Utility",
  tags: ["getCoords", "scene"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
