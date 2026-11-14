// custom effects as a post effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom effects as a post effect',
  summary:
    'postEffect.effect takes an array of effects, the same classes used on elements. A WaveEffect and a vignette run over the whole canvas after every element is drawn. The canvas covers the window, so the vignette centres on this stage through a uv it is given.',
  section: 'Custom Effects',
  tags: ['postEffect', 'postEffect.effect', 'effect array', 'dims.element', 'contentRect', 'canvasRect', 'srcRectUv'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/packages/effects/src/vignette.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
