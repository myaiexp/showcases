// PlayCanvas: Sprite frame pivots
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite frame pivots",
  summary:
    "A frame's pivot is the position and rotation point of its sprite. Four frames cut from the same drawing differ only in pivot (centre, bottom-left, bottom, top-right) and spin about their entity origins, which are marked with crosses.",
  section: "2D",
  tags: ["TextureAtlas","frames","pivot","SpriteComponent"],
  docs: ["repo/docs/user-manual/2D/sprite-editor.md","repo/docs/user-manual/editor/scenes/components/sprite.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
