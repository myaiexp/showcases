// postprocessing example: changing a composer's passes at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'EffectComposer: add and remove passes',
  summary:
    'addPass takes an optional index, removePass takes a pass out, removeAllPasses empties the chain. The composer keeps renderToScreen on whichever pass is last; the list over the picture shows the passes in order and which one draws to the canvas.',
  section: 'Passes',
  tags: ['EffectComposer', 'addPass', 'removePass', 'removeAllPasses', 'passes', 'renderToScreen'],
  docs: ['repo/src/effects/SepiaEffect.js', 'repo/src/effects/PixelationEffect.js', 'repo/src/effects/DotScreenEffect.js', 'repo/src/core/EffectComposer.js', 'repo/src/passes/Pass.js', 'repo/src/passes/EffectPass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
