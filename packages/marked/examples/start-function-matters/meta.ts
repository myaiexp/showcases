// marked example: Why start() matters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Why start() matters",
  summary:
    "The same ==highlight== extension runs twice: without start() only a mark at the very start of a paragraph is found, with it every mark is. start() tells the lexer where the next possible token begins.",
  section: 'Custom extensions',
  tags: ['extensions','start','inline','lexer'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Lexer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
