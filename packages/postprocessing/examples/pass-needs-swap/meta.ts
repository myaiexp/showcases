// postprocessing example: Pass.needsSwap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pass.needsSwap',
  summary:
    'The composer swaps its input and output buffers after every pass whose needsSwap is true. Turn it off on an inverting ShaderPass and its result stays in the output buffer: the CopyPass behind it reads the unchanged input, and the inversion disappears.',
  section: 'Passes',
  tags: ['Pass', 'needsSwap', 'ShaderPass', 'CopyPass', 'EffectComposer'],
  docs: ['repo/src/passes/Pass.js', 'repo/src/passes/ShaderPass.js', 'repo/src/passes/CopyPass.js', 'repo/src/core/EffectComposer.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
