// motion example: Bezier curve editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bezier curve editor',
  summary: 'Drag the two handles to draw your own easing curve and watch a ball travel with it, with the four numbers ready to paste. An array of four numbers passed as ease is a cubic bezier: the handles are its two control points. In the card, a scripted pointer pulls them around.',
  section: 'Easing',
  tags: ['ease', 'cubicBezier', 'drag', 'constraints', 'animate'],
  docs: ['pages/motion-dev/docs/easing-functions.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/drag.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
