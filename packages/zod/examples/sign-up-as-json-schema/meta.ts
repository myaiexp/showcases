// Zod example: a Zod schema and the JSON Schema it becomes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zod schema to JSON Schema',
  summary:
    'Pick a schema (a sign-up, a pet, an order) and see the JSON Schema z.toJSONSchema writes for it: types, length limits, formats, the enum, which fields are required. Form builders, API docs and AI tools read this text.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.object', 'z.email', 'z.enum'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
