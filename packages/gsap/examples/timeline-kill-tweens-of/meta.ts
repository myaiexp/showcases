// gsap example: timeline killTweensOf with and without properties, versus kill and revert of the whole timeline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline killTweensOf, kill and revert',
  summary:
    'Three boxes each have an x and a rotation tween in one looping timeline. Buttons kill only one box\'s rotation, all of another box\'s tweens, or the whole timeline, or revert it, while getTweensOf() counts what is left.',
  section: 'Timelines',
  tags: ['killTweensOf', 'kill', 'revert', 'getTweensOf', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/killTweensOf-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/kill-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/revert-.md',
    'pages/gsap-com/docs/v3/GSAP/Timeline/getTweensOf-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
