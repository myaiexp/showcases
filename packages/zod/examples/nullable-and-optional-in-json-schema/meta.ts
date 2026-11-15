// Zod example: how nullable, optional and undefined convert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nullable and optional in JSON Schema',
  summary:
    'Nullable adds "null" to the allowed types (or an anyOf when the schema has other rules, or nullable: true for OpenAPI), optional only changes the required list, and undefined has no JSON Schema form at all.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', '.nullable()', '.optional()', 'z.undefined', 'target'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
