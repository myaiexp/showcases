// css-doodle example: The cells attribute: rows of wrapped elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The cells attribute: rows of wrapped elements",
  summary:
    "The page wraps the tags and the doodle reads where they landed: @y is the row, so @pick(@y: …) gives each row its own colour. The box resizes, tags rewrap, and the colours follow.",
  section: "Attributes",
  tags: ['cells', '@y', '@pick'],
  docs: [
    'pages/css-doodle-com/reference/attribute-cells.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
