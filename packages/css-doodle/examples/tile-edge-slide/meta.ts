// css-doodle example: Sliding points along the edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sliding points along the edge",
  summary:
    "slide moves the points of an edge along it instead of across it, with the same values as edge. Together they draw curves that fold back, which edge alone cannot. Each edge is matched with its opposite so every piece is the same shape.",
  section: 'Shapes',
  tags: ['@tile', 'slide', 'edge', '@tile.hex'],
  docs: ['pages/css-doodle-com/reference/function-tile.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
