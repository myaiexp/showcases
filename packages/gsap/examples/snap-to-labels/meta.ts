// gsap example: Snap to timeline labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Snap to timeline labels',
  summary:
    'A timeline with four labels is scrubbed by a scrolling box, and when scrolling stops it snaps to a label. Compare "labels", "labelsDirectional" and a progress array, and jump with labelToScroll().',
  section: 'ScrollTrigger',
  tags: ['ScrollTrigger', 'snap', 'labels', 'labelsDirectional', 'labelToScroll', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollTrigger/labelToScroll-.md',
    'pages/gsap-com/docs/v3/Plugins/ScrollToPlugin.md',
    'pages/gsap-com/docs/v3/GSAP/gsap-context-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
