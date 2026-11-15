// Zod example: A compiled schema says the same thing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A compiled schema says the same thing',
  summary:
    "z.compile() makes a faster copy of a schema, not a different one. Each sample goes through the plain schema and the compiled copy side by side: the same output when it is good, the same issues with the same paths and messages when it is not.",
  section: 'AOT compilation',
  tags: ['z.compile', 'safeParse', 'issues'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
