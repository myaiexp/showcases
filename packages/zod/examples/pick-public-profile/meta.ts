// Zod example: a public profile schema picked from a full user record
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A public profile with .pick()",
  summary:
    "A full user record holds an email and a password hash. .pick() builds a schema of just the public fields, so the result of parsing a record with it contains only those, and the private ones never leave.",
  section: 'Objects',
  tags: ['.pick', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
