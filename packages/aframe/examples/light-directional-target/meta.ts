// aframe example: light: a directional light aimed at a target entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "light: a directional light aimed at a target entity",
  summary: "An <a-light> pointing down its -Z axis at a child entity named by target. Rotating the light moves the direction of the light; the target is only a point to aim at. A slider rotates the light about the X axis from straight down to horizontal.",
  section: 'Components',
  tags: ["a-light", "light", "directional", "target", "rotation"],
  docs: ["repo/docs/components/light.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
