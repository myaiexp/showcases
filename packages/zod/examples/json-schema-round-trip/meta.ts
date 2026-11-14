// Zod example: a schema survives a trip through JSON Schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zod to JSON Schema and back',
  summary:
    'A sign-up schema is written to JSON Schema and rebuilt with z.fromJSONSchema. The original and the rebuilt validator judge the same samples, and agree.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.fromJSONSchema', 'io', 'safeParse'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
