// Zod example: A failed parse runs your checks twice
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A failed parse runs your checks twice',
  summary:
    "A compiled schema answers valid data on its fast path and, when that fails, re-runs the standard parser to build the error. A counter inside a refine shows it: one run for plain and for valid data, two runs for compiled data that fails.",
  section: 'AOT compilation',
  tags: ['z.compile', '.refine', 'safeParse'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
