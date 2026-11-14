// marked example: Indented code blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Indented code blocks",
  summary:
    'Lines indented by four spaces become a code block, the original Markdown way to show code. Marked outputs a pre block with no language class.',
  section: 'Supported Markdown',
  tags: ['code','indent'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
