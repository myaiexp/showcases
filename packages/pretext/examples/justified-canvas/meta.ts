// Pretext example: justified text on canvas from line cursors and prepared segments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Justified text on canvas',
  summary:
    'layoutWithLines() gives each line start and end cursors; the prepared segments, kinds and widths between them let the leftover width be spread across the spaces. Lines that end mid-segment fall back to left-aligned.',
  section: 'Manual line layout',
  tags: ['layoutWithLines', 'segments', 'kinds', 'justify', 'canvas'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
