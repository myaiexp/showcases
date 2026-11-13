// gsap example: a timeline's getChildren, getById, recent, remove and clear on live content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline children inspector',
  summary:
    'A master timeline with three tweens and a nested timeline is queried with getChildren() (direct, nested, tweens only, after a time), getById(), and recent(). Buttons add a tween, remove the most recent child or clear() the whole timeline.',
  section: 'Timelines',
  tags: ['getChildren', 'getById', 'recent', 'remove', 'clear', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/getChildren-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/getById-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/recent-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/remove-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/clear-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
