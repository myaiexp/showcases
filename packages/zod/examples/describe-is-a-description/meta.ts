// Zod example: describe() equals meta() with only a description
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '.describe() is .meta() with a description',
  summary:
    'Four lines run one after another: describe() and meta({ description }) store the same thing, the original schema stays untouched because both return a new schema, and the description reaches the JSON Schema.',
  section: 'Metadata and registries',
  tags: ['.describe()', '.meta()', 'z.toJSONSchema'],
  docs: ['repo/packages/docs/content/metadata.mdx', 'repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
