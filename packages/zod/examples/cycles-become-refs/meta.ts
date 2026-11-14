// Zod example: a self-containing schema becomes a $ref
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Recursive schemas become $ref',
  summary:
    'A category that contains categories cannot be written out in full. Zod writes a $ref back to the top ("#") instead; with cycles: "throw" it refuses.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'cycles', '$ref', 'z.array'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
