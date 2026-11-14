// Zod example: .meta() fields copied into the JSON Schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Metadata becomes JSON Schema keywords',
  summary:
    'Titles, descriptions, examples, deprecated and your own fields stored with .meta() are copied into the JSON Schema. Passing an empty registry drops them all. Changed lines are highlighted.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', '.meta()', 'metadata', 'z.registry'],
  docs: ['repo/packages/docs/content/json-schema.mdx', 'repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
