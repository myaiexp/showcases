// postprocessing example: God rays: clampMax
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: clampMax',
  summary:
    "With weight and exposure turned up the rays would blow out. The clampMax option (maxIntensity on the material) is an upper bound on the effect's value, so lowering it flattens the brightest parts of the beams.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'clampMax', 'maxIntensity', 'godRaysMaterial'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
