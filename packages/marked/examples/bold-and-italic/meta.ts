// marked example: Bold and italic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bold and italic",
  summary:
    'Words wrapped in asterisks or underscores turn bold or italic: one marker for italic, two for bold, three for both. Marked outputs em and strong tags.',
  section: 'Supported Markdown',
  tags: ['strong','em','emphasis'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
