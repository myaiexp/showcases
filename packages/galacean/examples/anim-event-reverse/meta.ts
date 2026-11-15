// galacean example: Animation: events and reverse playback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: events and reverse playback",
  summary:
    "Three events on a sliding cube are counted while the animator runs forwards and, with a negative speed, backwards.",
  section: "Animation",
  tags: ['AnimationEvent','speed','addEvent'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/animation/animator.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
