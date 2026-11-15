// css-doodle example: The cells attribute: letters that lean towards the pointer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The cells attribute: letters that lean towards the pointer",
  summary:
    "@udx and @udy measure from each cell's centre to the pointer, so letters near it rise and turn pink. Move the pointer over the text; a card moves a pretend one back and forth.",
  section: "Attributes",
  tags: ['cells', '::letters', '@udx', '@udy', '$()'],
  docs: [
    'pages/css-doodle-com/reference/attribute-cells.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
