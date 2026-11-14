// marked example: Block versus inline extensions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Block versus inline extensions",
  summary:
    "One [[badge]] syntax built two ways: as a block extension a lone badge becomes a banner, as an inline extension badges sit in sentences as chips. level decides where Marked looks for it.",
  section: 'Custom extensions',
  tags: ['extensions','level','block','inline'],
  docs: ['repo/docs/USING_PRO.md','repo/src/Lexer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
