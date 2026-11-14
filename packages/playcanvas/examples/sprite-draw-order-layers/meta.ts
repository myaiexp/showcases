// PlayCanvas: Sprite draw order and layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite draw order and layers",
  summary:
    "Sprites at the same depth are ordered by drawOrder, lowest first, when their layer sorts manually. Four overlapping icons on a custom manual-sort layer take turns in front; the full view sets each drawOrder and removes the layer from the camera to make them vanish, while a fifth sprite stays on the World layer.",
  section: "2D",
  tags: ["SpriteComponent","drawOrder","layers","Layer","SORTMODE_MANUAL"],
  docs: ["repo/docs/user-manual/editor/scenes/components/sprite.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
