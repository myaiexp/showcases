// galacean example: Sprite pivot
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite pivot",
  summary:
    "Three identical sprites spin at the same speed with pivots (0.5, 0.5), (0, 0) and (1, 1): the pivot is the point that stays on the entity position. A slider changes pivot.x live in the full view.",
  section: "2D",
  tags: ['Sprite', 'pivot', 'Vector2'],
  docs: [
    'repo/docs/en/graphics/2D/sprite.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
