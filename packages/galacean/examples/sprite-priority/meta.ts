// galacean example: Sprite renderer priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sprite renderer priority",
  summary:
    "Three overlapping cards change their SpriteRenderer.priority and so their draw order: the lowest value is drawn first and sits at the back. Sliders set each priority in the full view.",
  section: "2D",
  tags: ['SpriteRenderer', 'priority'],
  docs: [
    'repo/docs/en/graphics/2D/spriteRenderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
