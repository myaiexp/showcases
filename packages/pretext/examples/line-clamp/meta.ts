// Pretext example: clamp a paragraph to N lines with an ellipsis, like line-clamp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line clamp with an ellipsis',
  summary:
    "N-1 lines come from layoutNextLine; the last is the longest prefix of what remains that fits once '…' is appended, found by binary search over measureNaturalWidth. Slide the width and the line count.",
  section: 'Manual line layout',
  tags: ['layoutNextLine', 'measureNaturalWidth', 'ellipsis', 'line-clamp'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
