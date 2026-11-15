// aframe example: animation: tween a component property such as light.intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "animation: tween a component property such as light.intensity",
  summary: "A dot-delimited property reaches inside a multi-property component: light.intensity swells and fades a point light over a pale sphere, and material.color shifts the sphere's own colour. Each frame goes through setAttribute, which the docs flag as the slower route.",
  section: 'Components',
  tags: ["animation", "property", "light.intensity", "material.color", "component property"],
  docs: ["repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
