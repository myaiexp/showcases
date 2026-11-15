// postprocessing example: EffectComposer setMainScene and setMainCamera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EffectComposer: setMainScene and setMainCamera',
  summary:
    'One composer with a RenderPass and a bloom pass is pointed at a different scene and a different camera by calling setMainScene and setMainCamera. Every pass that holds a scene or camera, including the effects of an EffectPass, follows.',
  section: 'Passes',
  tags: ['EffectComposer', 'setMainScene', 'setMainCamera', 'mainScene', 'mainCamera', 'RenderPass', 'BloomEffect'],
  docs: ['repo/src/effects/BloomEffect.js', 'repo/src/core/EffectComposer.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/EffectPass.js', 'repo/src/passes/Pass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
