// aframe example: animation: tween object3D and component internals directly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: tween object3D and component internals directly",
  summary: "Properties starting with object3D or components are animated on the three.js objects themselves, with no setAttribute per frame: object3D.position.y one axis at a time, object3D.rotation.z in degrees, material.opacity and a type: color tween of the material colour.",
  section: 'Components',
  tags: ["animation", "object3D.position.y", "object3D.rotation.z", "components.material.material.opacity", "type: color", "isRawProperty"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
