// Pretext example: inspect the segments, kinds and widths arrays of a prepared text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Segments, kinds and widths',
  summary:
    "prepareWithSegments() exposes segments, kinds and widths. Each segment is a chip coloured by its kind (text, space, tab, zero-width-break, soft-hyphen, hard-break ...) with its measured width. Edit the text and toggle 'pre-wrap'.",
  section: 'Manual line layout',
  tags: ['prepareWithSegments', 'segments', 'kinds', 'pre-wrap'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
