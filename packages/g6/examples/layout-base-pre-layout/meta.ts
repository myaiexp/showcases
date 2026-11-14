// g6 example: Layout option preLayout: positions before drawing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout option preLayout: positions before drawing",
  summary: "With preLayout the layout runs before the elements exist, so the model already holds positions when drawing starts; without it they are still unset. The readout compares the two.",
  section: 'Layout',
  tags: ["layout.preLayout", "GraphEvent.BEFORE_DRAW", "layout"],
  docs: [
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
    "repo/packages/site/docs/api/layout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
