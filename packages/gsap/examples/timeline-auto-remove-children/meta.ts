// gsap example: autoRemoveChildren true versus false, with children counted live
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'autoRemoveChildren',
  summary:
    'Two timelines play three tweens in a row, one with autoRemoveChildren. The panel counts the children left as they complete, and reversing both afterwards shows only the normal timeline can play backwards.',
  section: 'Timelines',
  tags: ['autoRemoveChildren', 'reverse', 'getChildren', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/autoRemoveChildren.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/getChildren-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/reverse-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/vars.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
