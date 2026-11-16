// aframe example: animation: several named animations on one entity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: several named animations on one entity",
  summary: "Double underscores name-space the component, so one entity runs animation, animation__2 and animation__color side by side. Each tweens its own property: rotation, position and material.color.",
  section: 'Components',
  tags: ["animation", "animation__<name>", "material.color", "rotation", "position", "dir: alternate"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
