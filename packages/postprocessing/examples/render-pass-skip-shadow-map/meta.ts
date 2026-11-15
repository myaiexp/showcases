// postprocessing example: RenderPass skipShadowMapUpdate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'RenderPass: skip the shadow map update',
  summary:
    'A ball bobs over a floor under a shadow-casting light. While skipShadowMapUpdate is on, the RenderPass turns off the shadow map auto update for its render, so the shadow freezes where it was; switch it off and the shadow catches up.',
  section: 'Passes',
  tags: ['RenderPass', 'skipShadowMapUpdate', 'shadowMap', 'EffectComposer'],
  docs: ['repo/src/passes/RenderPass.js', 'repo/src/passes/Pass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
