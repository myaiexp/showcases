// Zod example: A compiled schema is still just a schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A compiled schema is still just a schema',
  summary:
    "Each row does something to the plain schema and to its compiled copy and compares the answers: parsing, errors, .extend(), .optional(), JSON Schema export and even encoding. The compiled copy answers the same every time; the original is left unchanged.",
  section: 'AOT compilation',
  tags: ['z.compile', 'extend', 'optional', 'z.toJSONSchema', 'z.encode'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
