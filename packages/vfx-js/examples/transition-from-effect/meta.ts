// VFX-JS example: Building a transition on an effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Building a transition on an effect",
  summary:
    "A class can extend an effect from @vfx-js/effects and implement Transition. This Pixelate transition extends PixelateEffect: update() grows the cell size to a peak halfway, and render() feeds the effect the old content (ctx.from) in the first half and the new content (ctx.src) in the second, so the picture pixelates away and back in.",
  section: "Custom transitions",
  tags: ['Transition', 'PixelateEffect', 'TransitionEffectContext', 'update()', 'render()', 'progress', 'from'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts', 'repo/packages/effects/src/pixelate.ts', 'repo/packages/vfx-js/src/transition/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
