// Zod example: register() returns the same schema, meta() a new one
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'register() hands back the same schema',
  summary:
    'Four checks compare what comes back with the schema you started from. register() returns that very schema; meta() and describe() return a new one.',
  section: 'Metadata and registries',
  tags: ['.register()', '.meta()', '.describe()', 'z.registry'],
  docs: ['repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
