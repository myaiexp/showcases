// postprocessing example: SSAO: NormalPass and SSAOEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SSAO: NormalPass and SSAOEffect',
  summary:
    "Screen space ambient occlusion darkens creases and contact points. The wiring is a RenderPass, then a NormalPass that renders the scene's normals to a texture, then an EffectPass with an SSAOEffect given that texture.",
  section: 'SSAO',
  tags: ['SSAOEffect', 'NormalPass', 'EffectPass', 'blendMode'],
  docs: ['repo/README.md', 'repo/src/effects/SSAOEffect.js', 'repo/src/materials/SSAOMaterial.js', 'repo/src/passes/NormalPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
