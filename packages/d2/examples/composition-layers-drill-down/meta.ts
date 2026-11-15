// d2 example: Layers you click into
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layers you click into",
  summary:
    "Three levels of layers, each starting from a blank board with its own Markdown note at the top. A link on a shape opens the layer below it; the card steps through the four boards by rendering each one with `target`.",
  section: "Composition",
  tags: ["layers", "link", "markdown", "near"],
  docs: [
    "repo/docs/tour/layers.md",
    "repo/static/bespoke-d2/tiktok.d2",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
