// galacean example: Sprite atlas loaded
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite atlas loaded",
  summary:
    "A SpriteAtlas loaded through resourceManager with AssetType.SpriteAtlas from a generated .atlas JSON and PNG: all its sprites, getSprite by name and getSprites for duplicates.",
  section: "2D",
  tags: ['SpriteAtlas', 'AssetType.SpriteAtlas', 'getSprite', 'getSprites'],
  docs: [
    'repo/docs/en/graphics/2D/spriteAtlas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
