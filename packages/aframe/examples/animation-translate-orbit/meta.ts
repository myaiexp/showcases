// aframe example: animation: translate a box and orbit a sphere
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: translate a box and orbit a sphere",
  summary: "The docs' two opening examples: a box that moves along a line with linear easing and loops, and a sphere that orbits a 5-metre radius because its parent entity's rotation is animated. The animation component tweens the property named in property to the to value.",
  section: 'Components',
  tags: ["animation", "property", "to", "dur", "easing", "loop", "rotation", "position"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
