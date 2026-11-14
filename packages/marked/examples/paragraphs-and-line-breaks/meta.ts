// marked example: Paragraphs and line breaks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paragraphs and line breaks",
  summary:
    'A blank line starts a new paragraph, a single newline just joins lines, and two spaces (shown as dots) or a backslash at the end of a line force a break. This is how Marked turns typed lines into paragraphs and br tags.',
  section: 'Supported Markdown',
  tags: ['paragraph','br','hard break','breaks'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
