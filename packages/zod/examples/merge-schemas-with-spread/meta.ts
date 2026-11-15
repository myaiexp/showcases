// Zod example: a merged schema built by spreading two schemas' shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Merge two schemas with spread",
  summary:
    "A contact schema and an address schema each know their own fields. Spreading both .shape objects into a new z.object() builds a schema for the combined record, and you pick z.object, strictObject or looseObject for it yourself.",
  section: 'Objects',
  tags: ['.shape', 'z.object', 'spread'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
