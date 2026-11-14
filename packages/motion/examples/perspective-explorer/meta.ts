// motion example: Perspective explorer: depth and camera position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Perspective explorer: depth and camera position",
  summary: "A tilted photo wall you can look at differently: slide the perspective distance to flatten or exaggerate depth, and move the vanishing point to look up or down the scene. Compare the shared parent perspective with a per-card transformPerspective.",
  section: "Guides",
  tags: ["perspective","perspective-origin","transformPerspective","rotateX","rotateY"],
  docs: ["pages/motion-dev/docs/3d-transforms.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
