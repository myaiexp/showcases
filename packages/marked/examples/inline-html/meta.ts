// marked example: Inline HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Inline HTML",
  summary:
    'HTML tags typed inside a sentence pass straight through, so small things Markdown lacks, like keyboard keys, highlights and subscripts, are available. Marked leaves the tags as written.',
  section: 'Supported Markdown',
  tags: ['html','kbd','mark','sub'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
