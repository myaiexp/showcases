// postprocessing example: the lifecycle contracts of effects and passes, logged
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resizable, Initializable and Disposable',
  summary:
    'An Effect implements three small contracts: setSize(width, height), initialize(renderer, alpha, frameBufferType) and dispose(). This effect logs each call. The pass sizes it before initialising it, resizing the canvas calls setSize again, and removing and disposing the pass calls dispose.',
  section: 'Utilities',
  tags: ['Resizable', 'Initializable', 'Disposable', 'Effect', 'setSize', 'initialize', 'dispose', 'EffectPass'],
  docs: ['repo/README.md', 'repo/src/core/Resizable.js', 'repo/src/core/Initializable.js', 'repo/src/core/Disposable.js', 'repo/src/effects/Effect.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
