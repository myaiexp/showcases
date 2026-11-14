// marked example: Collapsible sections
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Collapsible sections",
  summary:
    "+++ Question ... +++ turns lines into an FAQ-style section that opens and closes when you click its title. A block extension writes the HTML details element and the body is still Markdown.",
  section: 'Custom extensions',
  tags: ['extensions','block','details','this.lexer.blockTokens'],
  docs: ['repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
