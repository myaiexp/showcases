// postprocessing example: God rays: samples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: samples',
  summary:
    "Every pixel takes a number of steps towards the sun. With few samples the beams break into visible copies of the pillars; with many they turn into smooth shafts.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'samples', 'godRaysMaterial'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
