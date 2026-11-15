// galacean example: Sprite region crop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite region crop",
  summary:
    "Four crops of one code-drawn texture, each a Sprite with its own region Rect; a fifth sprite slides its region window across the image. The full view has sliders for region x and y.",
  section: "2D",
  tags: ['Sprite', 'region', 'Rect', 'SpriteRenderer'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
