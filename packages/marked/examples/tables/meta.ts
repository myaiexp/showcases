// marked example: Tables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tables",
  summary:
    'Rows of text separated by pipes become a table, and colons in the divider row set whether a column aligns left, centre or right. Marked outputs table, th and td tags.',
  section: 'Supported Markdown',
  tags: ['table','GFM','alignment'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
