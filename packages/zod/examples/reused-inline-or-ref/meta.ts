// Zod example: a reused schema inlined or extracted as a $def
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'reused: inline or ref',
  summary:
    'An address schema is used for both billing and shipping. By default it is written out twice; with reused: "ref" it is written once under $defs and both fields point to it.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'reused', '$defs', 'z.object'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
