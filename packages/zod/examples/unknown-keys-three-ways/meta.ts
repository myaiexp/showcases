// Zod example: one payload with extra keys through z.object, strictObject and looseObject
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Unknown keys: strip, reject or keep",
  summary:
    "The same sign-up arrives with an extra isAdmin field nobody asked for. z.object() quietly drops it, z.strictObject() rejects the whole thing and z.looseObject() lets it through.",
  section: 'Objects',
  tags: ['z.object', 'z.strictObject', 'z.looseObject'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
