// GSAP example: CustomBounce creating a bounce ease and a synchronized squash ease
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CustomBounce with squash',
  summary:
    'CustomBounce.create() builds a bounce ease and a matching squash ease; a ball drops with one tween on y and one on scaleX/scaleY. Sliders change strength and squash and redraw both curves.',
  section: 'Custom eases',
  tags: ['CustomBounce', 'CustomEase', 'strength', 'squash', 'squashID', 'endAtStart'],
  docs: [
    'pages/gsap-com/docs/v3/Eases/CustomBounce.md',
    'pages/gsap-com/docs/v3/Eases/CustomEase.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
