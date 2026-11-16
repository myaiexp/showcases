// aframe example: light: ambient plus a directional light from a position vector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: ambient plus a directional light from a position vector",
  summary: "Ambient light fills everything evenly so shadowed sides are not black; a directional light shines along the vector from its position to the origin, like the sun, so only the direction matters. A child target entity can set the direction instead. A sun orbits to show the change.",
  section: 'Components',
  tags: ["light", "ambient", "directional", "position", "target", "intensity", "color"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
