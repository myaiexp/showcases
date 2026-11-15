// Zod example: z.fromJSONSchema builds a validator from JSON text
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSON Schema text to a validator',
  summary:
    'A JSON Schema is typed in as plain text and z.fromJSONSchema turns it into a working Zod validator that judges sample pets: too-short names, decimal ages, missing fields. Edit the text and the verdicts change. Marked experimental in the docs.',
  section: 'JSON Schema',
  tags: ['z.fromJSONSchema', 'safeParse'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
