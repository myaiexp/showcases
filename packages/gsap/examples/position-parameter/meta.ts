// gsap example: a timeline drawn as lanes to show how the position parameter places tweens
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position parameter lanes',
  summary:
    'Three tweens are drawn as bars on a time axis with a moving playhead. Pick the position string for the last tween ("<", "-=0.5", "<25%", a label, an absolute time) and watch its bar move.',
  section: 'Timelines',
  tags: ['timeline', 'position parameter', 'labels', 'addLabel', 'getTweensOf', 'startTime'],
  docs: [
    'pages/gsap-com/resources/position-parameter.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/getTweensOf-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/addLabel-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
