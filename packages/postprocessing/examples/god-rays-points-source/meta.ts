// postprocessing example: God rays: a Points light source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: a Points light source',
  summary:
    "GodRaysEffect takes a Mesh or a Points object as its light. Here a single glowing point sprite, drawn with PointsMaterial, stands in for the sun and throws the same shafts past the pillars.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'lightSource', 'Points'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
