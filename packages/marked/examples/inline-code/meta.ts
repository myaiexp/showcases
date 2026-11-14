// marked example: Inline code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Inline code",
  summary:
    'Words in backticks appear in a code font and are left exactly as typed. Use a longer run of backticks to show a backtick itself.',
  section: 'Supported Markdown',
  tags: ['codespan','backtick'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Tokenizer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
