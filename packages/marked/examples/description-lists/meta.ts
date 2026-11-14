// marked example: Description lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Description lists",
  summary:
    "Lines like \": Tent : sleeps two\" become a term-and-meaning list, built from the docs' own pair of extensions. Optionally walkTokens adds a word to every bold term, showing it reaches inside the new syntax.",
  section: 'Custom extensions',
  tags: ['extensions','descriptionList','childTokens','walkTokens','this.lexer.inline'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Lexer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
