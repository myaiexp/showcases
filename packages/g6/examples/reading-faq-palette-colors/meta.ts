// g6 example: FAQ: a palette color list, not a single color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ: a palette color list, not a single color',
  summary: "node.palette with color: ['red', 'green', 'blue'] maps each value of the field to a color. A single string such as 'red' is not a color list, so nothing is mapped.",
  section: 'Further Reading',
  tags: ['node.palette', 'palette.field', 'palette.color', 'setNode'],
  docs: [
    'repo/packages/site/docs/manual/faq.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
