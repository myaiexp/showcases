// postprocessing example: SSAO: luminance influence
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: luminance influence',
  summary:
    "luminanceInfluence fades the occlusion out where the scene colour is bright, which stops AO from dirtying highlights. At 0 every pixel is darkened equally; at 1 the white walls lose most of their shading while darker objects keep it.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'luminanceInfluence'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
