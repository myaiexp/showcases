// galacean example: Sprite sheet frames
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite sheet frames",
  summary:
    "One texture sheet of eight frames with a Sprite per frame, each using its own region, swapped on a timer to play a hopping ball. The sheet itself is shown below. A slider scrubs frames in the full view.",
  section: "2D",
  tags: ['Sprite', 'region', 'Rect', 'SpriteRenderer.sprite'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
    'repo/docs/en/graphics/2D/spriteAtlas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
