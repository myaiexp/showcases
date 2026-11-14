// Zod example: a PATCH body schema where every field is optional
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Partial: a PATCH update",
  summary:
    "Saving a whole profile needs every field, but changing one setting should not. .partial() turns every field optional, so a PATCH body can carry just what changed; anything that is sent must still be valid.",
  section: 'Objects',
  tags: ['.partial', 'z.object', 'z.email'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
