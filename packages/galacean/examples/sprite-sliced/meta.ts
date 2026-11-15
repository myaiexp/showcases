// galacean example: Sliced draw mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sliced draw mode",
  summary:
    "A panel drawn with a quarter-size border is stretched in Simple mode (corners smear) and in Sliced mode (corners keep their size) while the renderer width and height change.",
  section: "2D",
  tags: ['SpriteDrawMode', 'drawMode', 'border', 'Vector4'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
