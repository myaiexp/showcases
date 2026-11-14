// Zod example: toJSONSchema target dialects compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'target: which JSON Schema dialect',
  summary:
    'One schema written for draft 2020-12, draft-07, draft-04 and OpenAPI 3.0. Highlighted lines show where the dialects spell the same rule differently, such as exclusive limits, constants and nullable.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'target', 'z.literal', '.nullable()'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
