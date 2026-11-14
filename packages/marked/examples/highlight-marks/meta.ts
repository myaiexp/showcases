// marked example: Highlighter marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Highlighter marks",
  summary:
    "Wrap words in double equals signs and they get a yellow highlighter stroke. An inline extension with start(), tokenizer() and renderer() adds the syntax.",
  section: 'Custom extensions',
  tags: ['extensions','inline','start','tokenizer','this.lexer.inlineTokens'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
