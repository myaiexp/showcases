// marked example: Callout containers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Callout containers",
  summary:
    ":::tip ... ::: wraps several lines of full Markdown, lists and bold included, in a coloured box. A block extension lexes the inside with this.lexer.blockTokens and renders it with this.parser.parse.",
  section: 'Custom extensions',
  tags: ['extensions','block','this.lexer.blockTokens','this.parser.parse'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Lexer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
