// gsap example: nextLabel(), previousLabel(), removeLabel() and the labels object on a paused timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label navigation: nextLabel and previousLabel',
  summary:
    'A dot travels three sides of a box on a paused timeline. Previous and next buttons call tweenTo(previousLabel()) and tweenTo(nextLabel()), and removeLabel() or addLabel() edit the stops live while chips mirror the labels object.',
  section: 'Timelines',
  tags: ['nextLabel', 'previousLabel', 'removeLabel', 'labels', 'tweenTo'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/nextLabel-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/previousLabel-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/removeLabel-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/labels.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/currentLabel-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
