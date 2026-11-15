// postprocessing example: SSAO: DepthDownsamplingPass wiring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: DepthDownsamplingPass wiring',
  summary:
    "A DepthDownsamplingPass between the NormalPass and the SSAOEffect packs half-resolution normals and depth into one texture, passed to the effect as normalDepthBuffer. The AO then runs at half size, and depth-aware upsampling uses that texture to keep edges clean.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'DepthDownsamplingPass', 'NormalPass', 'normalDepthBuffer', 'depthAwareUpsampling', 'resolutionScale'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js', 'repo/src/passes/DepthDownsamplingPass.js', 'repo/src/materials/DepthDownsamplingMaterial.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
