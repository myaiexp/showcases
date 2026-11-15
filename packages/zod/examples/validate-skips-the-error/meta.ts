// Zod example: validate() against safeParse().success
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'validate() against safeParse().success',
  summary:
    "On a compiled schema, z.validate() answers true or false without ever building an error. safeParse().success on bad data builds the whole ZodError first and throws it away. The race times both on the same inputs.",
  section: 'AOT compilation',
  tags: ['z.compile', 'z.validate', 'safeParse'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
