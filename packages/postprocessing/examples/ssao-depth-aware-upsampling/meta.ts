// postprocessing example: SSAO: depth-aware upsampling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: depth-aware upsampling',
  summary:
    "When the AO buffer is smaller than the screen, depthAwareUpsampling picks for each pixel the AO texel whose depth matches best instead of blending neighbours. Switch it off and the occlusion bleeds across object edges.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'depthAwareUpsampling', 'resolutionScale', 'BlendFunction'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js', 'repo/src/passes/DepthDownsamplingPass.js', 'repo/src/effects/glsl/ssao.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
