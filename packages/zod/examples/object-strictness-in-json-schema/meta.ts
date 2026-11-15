// Zod example: additionalProperties for plain, strict and loose objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Strict, loose and plain objects',
  summary:
    'A stray key is parsed by a plain, a strict and a loose object, and each one is asked for its JSON Schema as output and as input. The additionalProperties keyword says what Zod does with extra keys (or, for input, says nothing).',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'z.strictObject', 'z.looseObject', 'additionalProperties', 'io'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
