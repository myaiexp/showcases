// gsap example: a master timeline assembled from timelines returned by section functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested master timeline',
  summary:
    'Intro, middle and conclusion are separate functions that each return a timeline. A master timeline adds them with a gap and an overlap, and a slider scrubs the whole thing.',
  section: 'Timelines',
  tags: ['timeline', 'nesting', 'add', 'position parameter', 'progress', 'stagger'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/gsap-timeline-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/add-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/progress-.md',
    'pages/gsap-com/resources/position-parameter.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
