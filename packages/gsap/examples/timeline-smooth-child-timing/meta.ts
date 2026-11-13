// gsap example: smoothChildTiming true versus false when a child tween is reversed mid-play
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'smoothChildTiming on and off',
  summary:
    'Two identical timelines each play a long child tween, then both children are reversed mid-flight. With smoothChildTiming the box carries on smoothly backwards; without it the box jumps to its mirrored position. The panel prints each child\'s startTime.',
  section: 'Timelines',
  tags: ['smoothChildTiming', 'reverse', 'startTime', 'timeline'],
  docs: [
    'pages/gsap-com/docs/v3/GSAP/Timeline/smoothChildTiming.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/reverse-.md',
    'pages/gsap-com/docs/v3/GSAP/Tween/startTime-.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
