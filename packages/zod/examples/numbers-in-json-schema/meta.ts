// Zod example: numeric types written as JSON Schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numbers in JSON Schema',
  summary:
    'z.number, z.int, z.int32 and z.float32 and common limits shown beside the type and bounds they become: integer or number, minimum and maximum, exclusiveMinimum, multipleOf.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.int', 'z.int32', 'z.float32', '.multipleOf()'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
