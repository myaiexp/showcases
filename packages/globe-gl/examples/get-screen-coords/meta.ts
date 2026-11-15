// globe-gl example: Utility: getScreenCoords
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Utility: getScreenCoords",
  summary:
    "getScreenCoords(lat, lng, altitude) gives a place's current { x, y } in canvas pixels. Plain DOM labels over the canvas are moved to it every frame, and fade out on the far side by comparing each place with pointOfView().",
  section: "Utility",
  tags: ["getScreenCoords", "pointOfView"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
