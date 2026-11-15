// postprocessing example: the README's EffectComposer, RenderPass and EffectPass setup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Composer, RenderPass, EffectPass',
  summary:
    'The setup from the README: a WebGLRenderer with antialias, stencil and depth off, an EffectComposer with a RenderPass first and an EffectPass holding a BloomEffect after it. The glowing lamps have emissive colours above 1, which only survive into the bloom with HalfFloat frame buffers.',
  section: 'Usage',
  tags: ['EffectComposer', 'RenderPass', 'EffectPass', 'BloomEffect', 'addPass', 'composer.render', 'frameBufferType'],
  docs: ['repo/README.md', 'repo/src/core/EffectComposer.js', 'repo/src/passes/RenderPass.js', 'repo/src/passes/EffectPass.js', 'repo/src/passes/Pass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
