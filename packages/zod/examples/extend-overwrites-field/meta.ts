// Zod example: extend with an existing key replaces that field's schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Extend can overwrite a field",
  summary:
    "Order ids used to be numbers. .extend() with the same key replaces the old rule rather than adding a second one, so the extended schema takes the new text ids and refuses the old numbers.",
  section: 'Objects',
  tags: ['.extend', 'z.object', 'startsWith'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
