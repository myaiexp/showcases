// galacean example: Sprite from a texture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite from a texture",
  summary:
    "A Sprite made with new Sprite(engine) has no texture until one is assigned; one made with a texture shows at once. Swapping sprite.texture or renderer.sprite redraws every renderer that uses it.",
  section: "2D",
  tags: ['Sprite', 'texture', 'SpriteRenderer.sprite'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
