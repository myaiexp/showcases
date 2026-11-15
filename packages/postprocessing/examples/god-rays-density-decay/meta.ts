// postprocessing example: God rays: density and decay
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: density and decay',
  summary:
    "Each shaft is a radial blur towards the sun. density stretches how far along that line the samples travel, and decay fades each successive sample, so together they set the length and falloff of the beams.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'godRaysMaterial', 'density', 'decay'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
