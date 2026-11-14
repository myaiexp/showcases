// Zod example: deepPartial makes nested objects and list items optional too
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "deepPartial: optional all the way down",
  summary:
    ".partial() only loosens the top level, so a post whose author is empty still fails on author.name. z.deepPartial() reaches into nested objects and lists too, while values that are present are still checked.",
  section: 'Objects',
  tags: ['z.deepPartial', '.partial', 'z.object', 'z.array'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
