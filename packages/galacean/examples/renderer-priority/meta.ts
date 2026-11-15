// galacean example: Renderer priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer priority",
  summary:
    "Two translucent panes at the same distance overlap. With equal distance the renderer priority decides the draw order: the smaller value is drawn first, so the other pane ends up on top. The card swaps the two priorities.",
  section: "Renderer",
  tags: ['Renderer.priority', 'isTransparent', 'render queue'],
  docs: [
    'repo/docs/en/graphics/renderer/order.mdx',
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
