// aframe example: scale: a negative factor reflects, turning a sphere inside out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "scale: a negative factor reflects, turning a sphere inside out",
  summary: "A sphere with a painted panorama is invisible from inside (its faces point out). Scale 1 1 -1, the docs' trick for sky spheres, reflects it so the texture maps on the interior. A toggle flips the dome between the reflected and the normal scale, and the label reads the scale back.",
  section: 'Components',
  tags: ["scale", "negative scale", "reflection", "sky sphere", "material", "src"],
  docs: ["repo/docs/components/scale.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
