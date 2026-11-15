// Zod example: toJSONSchema of a registry makes linked schemas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A registry as linked JSON Schemas',
  summary:
    'Users and posts refer to each other. Converting the whole registry gives one JSON Schema per id, with $ref links between them; the uri option turns the ids into full addresses.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.registry', 'uri', 'id', '$ref'],
  docs: ['repo/packages/docs/content/json-schema.mdx', 'repo/packages/docs/content/metadata.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
