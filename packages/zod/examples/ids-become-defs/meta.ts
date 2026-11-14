// Zod example: a schema id becomes a $defs entry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'An id turns a schema into a definition',
  summary:
    'An email schema registered with an id and used twice is written once under $defs and referred to by $ref. Without the id its rules appear twice.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'metadata', 'id', '$defs', '.register()'],
  docs: ['repo/packages/docs/content/json-schema.mdx', 'repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
