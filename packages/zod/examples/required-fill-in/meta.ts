// Zod example: required makes optional fields mandatory, all or a chosen few
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Required: fields that must now be there",
  summary:
    "A profile lets bio and avatar stay empty while a user is signing up. .required() flips optional fields to mandatory for the \"publish\" step, and .required({ bio: true }) does it for one field only.",
  section: 'Objects',
  tags: ['.required', 'z.object', '.optional'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
