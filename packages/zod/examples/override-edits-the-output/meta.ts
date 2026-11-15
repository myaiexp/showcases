// Zod example: override changes each JSON Schema piece
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'override: edit the JSON as it is made',
  summary:
    'A callback sees every piece of the JSON Schema and edits it in place: give every unlimited string a maxLength, or stamp a custom keyword on every object. Changed lines are highlighted.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'override', 'ctx.jsonSchema'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
