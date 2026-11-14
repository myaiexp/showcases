// VFX-JS example: Implementing Transition directly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Implementing Transition directly",
  summary:
    "For more than one shader, implement Transition yourself: a transition is an Effect with a few extra hooks and a context that carries the run. This BlurFade blurs horizontally into a render target, then vertically into the output, with the blur peaking halfway while the old and new content crossfade. render() passes the input through while ctx.holding.",
  section: "Custom transitions",
  tags: ['Transition', 'TransitionEffect', 'TransitionEffectContext', 'init()', 'render()', 'createRenderTarget', 'draw', 'progress'],
  docs: ['pages/amagi-dev/vfx-js-transitions/custom.md', 'repo/docs/TRANSITION.md', 'repo/packages/vfx-js/src/transition/shader.ts', 'repo/packages/vfx-js/src/transition/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
