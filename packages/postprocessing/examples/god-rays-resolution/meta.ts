// postprocessing example: God rays: resolution scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: resolution scale',
  summary:
    "The ray buffers render at a fraction of the canvas, set by resolutionScale or effect.resolution.scale. At 0.1 the beams turn blocky and soft; at 1 they are as sharp as the scene.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'resolutionScale', 'resolution.scale'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
