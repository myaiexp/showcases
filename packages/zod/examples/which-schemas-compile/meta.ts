// Zod example: Which schemas z.compile can speed up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which schemas z.compile can speed up',
  summary:
    "z.compile() asks each schema whether it can be compiled. Some things (coerce, async checks, recursion, an unsupported member inside a union) make it give back the very same schema untouched; an unsupported child inside an object or array keeps the surrounding structure compiled. The list shows what really happened to each.",
  section: 'AOT compilation',
  tags: ['z.compile', 'z.coerce', 'z.xor', 'z.union'],
  docs: ['repo/packages/docs/content/compile.mdx', 'repo/packages/docs/content/blog/introducing-z-compile.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
