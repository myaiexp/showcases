// VFX-JS example: opts as a function: chosen after the callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "opts as a function: chosen after the callback",
  summary:
    "run(cb, () => opts) calls the function once, right after cb resolves, so the spec can depend on the new content. Here each new slide carries a mood; a wild one gets Glitch and a calm one gets Crossfade. The caption logs the order: cb first, then opts.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'run()', 'opts function', 'Glitch', 'Crossfade'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'repo/packages/vfx-js/src/transition/transition.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
