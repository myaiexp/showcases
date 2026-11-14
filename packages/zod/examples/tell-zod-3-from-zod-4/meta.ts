// Zod example: a library checks _zod to tell Zod 4 from Zod 3
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Telling Zod 3 from Zod 4',
  summary:
    'A library that still supports Zod 3 users gets either kind of schema. It checks for the _zod property, which only Zod 4 schemas have, then reads the definition from the right place (_zod.def or _def) before parsing a sample.',
  section: 'For library authors',
  tags: ['_zod', '_def', 'zod/v3', 'zod/v4/core', 'peerDependencies'],
  docs: ['repo/packages/docs/content/library-authors.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
