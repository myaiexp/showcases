// VFX-JS example: ease: smoothstep, linear or a function
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ease: smoothstep, linear or a function",
  summary:
    "t, the progress the shader sees, follows linear time through an ease: 'smoothstep' (the default), 'linear' or any function from 0..1 to a number. The same eased t reaches the shader and any JS effect. Pick one and watch how the Swipe accelerates.",
  section: "Transitions",
  tags: ['vfx.addTransition', 'show()', 'ease', 'Swipe'],
  docs: ['repo/docs/TRANSITION.md', 'pages/amagi-dev/vfx-js-transitions/api.md', 'pages/amagi-dev/vfx-js-transitions/how-it-works.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
