// marked example: Literal numeric entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Literal numeric entities",
  summary:
    "Marked turns &#27; into an invisible character inside text tokens; the docs' numericEntity extension keeps each reference as its own token with its original spelling. Two token lists are shown side by side.",
  section: 'Custom extensions',
  tags: ['extensions','numericEntity','lexer','tokens'],
  docs: ['repo/docs/USING_ADVANCED.md','repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
