// postprocessing example: LambdaPass as a probe between passes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'LambdaPass: a probe between passes',
  summary:
    'A LambdaPass runs a function when the composer reaches it and draws nothing. Two of them read renderer.info after the RenderPass and after an effect pass: the scene costs many draw calls, each fullscreen effect pass exactly one. The full view can add crates to watch the first number grow.',
  section: 'Passes',
  tags: ['LambdaPass', 'EffectComposer', 'RenderPass', 'EffectPass', 'renderer.info'],
  docs: ['repo/src/effects/VignetteEffect.js', 'repo/src/effects/SepiaEffect.js', 'repo/README.md', 'repo/src/passes/LambdaPass.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
