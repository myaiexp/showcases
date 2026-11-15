// Zod example: safeExtend keeps a refinement that plain extend refuses to carry over
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Extending a schema that has a rule",
  summary:
    "A sign-up form checks that password and confirm match. Plain .extend() refuses to overwrite a field on a schema carrying such a rule and throws; .safeExtend() makes the stricter password field and keeps the matching rule running.",
  section: 'Objects',
  tags: ['.safeExtend', '.extend', 'refine', 'path'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
