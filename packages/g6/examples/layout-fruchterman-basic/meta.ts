// g6 example: Fruchterman layout: gravity and speed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fruchterman layout: gravity and speed",
  summary: "The Fruchterman layout simulates attraction along edges and repulsion between all nodes. gravity pulls nodes to the centre and speed sets how far they move per iteration; sliders change both on the docs' 11-node graph.",
  section: 'Layout',
  tags: ["fruchterman", "gravity", "speed"],
  docs: [
    "repo/packages/site/docs/manual/layout/FruchtermanLayout.en.md",
    "repo/packages/site/docs/manual/layout/BaseLayout.en.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
