// marked example: Strikethrough
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Strikethrough",
  summary:
    'Text between double tildes is crossed out, handy for old prices or finished plans. It is a GitHub Flavored Markdown feature that Marked supports by default.',
  section: 'Supported Markdown',
  tags: ['del','GFM','~~'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
