// Zod example: duplicate registry ids are caught at JSON Schema conversion
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Two schemas with the same id',
  summary:
    'The docs promise an error when two schemas are registered under one id. In Zod 4.6.7 adding is silent and the registry then answers with the later schema; the clash is reported only when both are converted to JSON Schema together.',
  section: 'Metadata and registries',
  tags: ['z.registry', 'id', 'add', 'z.toJSONSchema', 'metadata'],
  docs: ['repo/packages/docs/content/metadata.mdx', 'repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
