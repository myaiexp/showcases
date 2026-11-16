// aframe example: fog: exponential fog and density
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fog: exponential fog and density",
  summary: "type: exponential fog thickens with distance by a density factor, so a small number goes a long way: the default 0.00025 is almost clear and 0.1 hides things a few metres away. The fog colour is also what far objects fade to. A slider moves density on a logarithmic scale.",
  section: 'Components',
  tags: ["fog", "type: exponential", "density", "color", "scene"],
  docs: ["repo/docs/components/fog.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
