// marked example: Headings: underlined
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Headings: underlined",
  summary:
    'A line of text with === or --- underneath becomes a heading too, the older way of writing titles. Marked treats === as the top level and --- as the second.',
  section: 'Supported Markdown',
  tags: ['heading','lheading','setext'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
