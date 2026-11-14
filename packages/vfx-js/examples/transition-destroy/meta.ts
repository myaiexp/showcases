// VFX-JS example: destroy(): stop tracking the element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "destroy(): stop tracking the element",
  summary:
    "t.destroy() cancels any run and stops tracking the element. A destroyed handle's run() and show() still apply the DOM change, but nothing animates: they cut. The card runs a transition, destroys the handle, cuts, then adds a new handle and animates again.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'destroy()', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'repo/packages/vfx-js/src/transition/transition.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
