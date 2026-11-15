// galacean example: Animation: clear a clip's events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animation: clear a clip's events",
  summary:
    "clip.clearEvents() removes every event; the counter on the Script stops rising until the events are added again.",
  section: "Animation",
  tags: ['clearEvents','addEvent','AnimationClip'],
  docs: [
    'repo/docs/en/animation/clip.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
