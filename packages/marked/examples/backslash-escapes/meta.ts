// marked example: Backslash escapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Backslash escapes",
  summary:
    'A backslash in front of a Markdown symbol makes it plain text instead of formatting. It is how you write a literal * or # when you do not mean bold or a heading.',
  section: 'Supported Markdown',
  tags: ['escape','backslash'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
