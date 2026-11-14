// Zod example: unrepresentable types throw or become {}
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Types JSON Schema cannot describe',
  summary:
    'Dates, bigints, sets, transforms and undefined have no JSON Schema form. By default converting them throws; with unrepresentable: "any" each becomes {} (anything goes). Seen row by row.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'unrepresentable', 'z.date', 'z.bigint', 'z.set'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
