// Zod example: pull single field schemas out of an object with .shape and check loose values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reuse one field with .shape",
  summary:
    "A sign-up schema already knows what a good email, age and plan look like. .shape hands out each field's own schema, so a lone value can be checked with exactly the rule the whole object uses.",
  section: 'Objects',
  tags: ['.shape', 'z.object', 'z.email', 'z.enum'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
