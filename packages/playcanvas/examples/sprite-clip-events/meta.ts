// PlayCanvas: Sprite clip events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite clip events",
  summary:
    "A sprite animation clip fires play, pause, resume, stop, end and loop. A non-looping coin clip pops the coin when end fires and then plays again; the full view counts every event and has buttons for play, pause, resume and stop.",
  section: "2D",
  tags: ["SpriteAnimationClip","EVENT_END","EVENT_PLAY","EVENT_LOOP","play","pause","resume","stop"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sprite.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
