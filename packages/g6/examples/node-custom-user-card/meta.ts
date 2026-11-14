// g6 example: Custom node: user card
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom node: user card",
  summary:
    "A custom Rect that draws a round avatar image, a status dot, a name and a role from data mapped into style fields.",
  section: 'Node',
  tags: ['register', 'Rect', 'upsert', 'image', 'circle', 'text', 'getSize'],
  docs: ['repo/packages/site/docs/manual/element/node/custom-node.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
