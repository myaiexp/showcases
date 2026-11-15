// galacean example: Animation: animation events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: animation events",
  summary:
    "The docs' AnimationEvent: functionName and time added with clip.addEvent make the animation call Flasher.flash() on the same entity three times as the cube slides by.",
  section: "Animation",
  tags: ['AnimationEvent','functionName','addEvent','Script'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
    'repo/docs/en/animation/system.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
