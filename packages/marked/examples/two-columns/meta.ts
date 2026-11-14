// marked example: Two-column layout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Two-column layout",
  summary:
    "A :::columns block with a ||| line in the middle lays two bits of Markdown side by side. The block extension lexes each half separately with this.lexer.blockTokens.",
  section: 'Custom extensions',
  tags: ['extensions','block','this.lexer.blockTokens','this.parser.parse'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Lexer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
