// gsap example: shiftChildren with adjustLabels and ignoreBeforeTime, drawn on a ruler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline shiftChildren',
  summary:
    'Four sequential tweens and a label are drawn on a ruler while the playhead loops. Buttons call shiftChildren() to push everything later, to push the label with it, or to splice a gap in only after a given time.',
  section: 'Timelines',
  tags: ['shiftChildren', 'labels', 'clear', 'startTime', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/shiftChildren-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/clear-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/labels.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/getChildren-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
