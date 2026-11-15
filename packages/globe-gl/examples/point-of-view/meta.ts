// globe-gl example: Render: pointOfView
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Render: pointOfView",
  summary:
    "pointOfView({ lat, lng, altitude }, ms) moves the camera to look straight down at a place from an altitude in globe radii, easing over ms milliseconds (0 jumps). Any coordinate can be left out: the altitude slider zooms without turning.",
  section: "Render Control",
  tags: ["pointOfView"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
