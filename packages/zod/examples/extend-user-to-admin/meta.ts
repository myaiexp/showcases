// Zod example: an Admin schema built from a User schema with .extend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Grow a User into an Admin",
  summary:
    ".extend() adds fields to an existing object schema without touching the original. The Admin keeps the User's name and email, then demands a role of \"admin\" and at least one permission.",
  section: 'Objects',
  tags: ['.extend', 'z.object', 'z.literal', 'z.array'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
