// Zod example: what a z.string() from each import path can and cannot do
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which import is which',
  summary:
    'The same z.string() made through each import path: zod, zod/v4, zod/mini, zod/v4/core and zod/v3. Each line is probed live for the markers that tell them apart: the Zod 4 and Zod 3 internals, chained methods, .check() and parse methods. Library authors use exactly these markers.',
  section: 'Release notes',
  tags: ['zod/mini', 'zod/v4', 'zod/v4/core', 'zod/v3', '_zod', '_def', '.check()'],
  docs: ['repo/packages/docs/content/v4/versioning.mdx', 'repo/packages/docs/content/library-authors.mdx', 'repo/packages/docs/content/packages/mini.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
