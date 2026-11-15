// postprocessing example: SSAO: resolution scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: resolution scale',
  summary:
    "The resolutionScale option, or effect.resolution.scale at runtime, sets the size of the occlusion buffer relative to the canvas. At low values the shading turns blurry and loses fine creases; at 1 it is full detail at full cost.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'resolutionScale', 'resolution.scale'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js', 'repo/src/core/Resolution.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
