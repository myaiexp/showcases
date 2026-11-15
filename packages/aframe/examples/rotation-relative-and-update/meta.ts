// aframe example: rotation: degrees in markup, radians on object3D, inherited by children
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "rotation: degrees in markup, radians on object3D, inherited by children",
  summary: "A parent at rotation 0 45 0 holds the docs' child2 at 15 45 30, whose world rotation is 15 90 30. Buttons set rotation through object3D.rotation (an Euler in radians, with degToRad) and through setAttribute in degrees; getAttribute('rotation') always converts back to degrees.",
  section: 'Components',
  tags: ["rotation", "object3D.rotation", "Euler", "degToRad", "getAttribute", "setAttribute", "relative rotation"],
  docs: ["repo/docs/components/rotation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
