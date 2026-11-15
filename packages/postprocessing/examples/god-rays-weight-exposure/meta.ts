// postprocessing example: God rays: weight and exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: weight and exposure',
  summary:
    "weight scales each sample that goes into a shaft and exposure scales the sum, so they brighten and dim the beams. Pushed up, the rays burn into the sky; pushed down, they fade away.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'godRaysMaterial', 'weight', 'exposure'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
