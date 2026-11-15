// globe-gl example: Utility: toGeoCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: toGeoCoords",
  summary:
    "toGeoCoords({ x, y, z }) converts a scene position back to { lat, lng, altitude }. A box-shaped satellite flies a tilted orbit as a plain Three.js mesh; converting its position every frame gives the readout and the yellow ground track drawn under it.",
  section: "Utility",
  tags: ["toGeoCoords", "getGlobeRadius", "scene", "pathsData"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
