// PlayCanvas: Animated sprite clips
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Animated sprite clips",
  summary:
    "An animated sprite component holds named clips, each with an fps, a loop flag and a sprite asset. A turning coin has a spin clip of eight frames and a wobble clip of four; the full view switches clips, changes fps and speed, toggles loop, and pauses, resumes or stops the current clip.",
  section: "2D",
  tags: ["SpriteComponent","clips","play","pause","resume","stop","speed","autoPlayClip","SpriteAnimationClip"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sprite.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
