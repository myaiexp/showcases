// Zod example: partial vs exactPartial when a key is present but undefined
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "exactPartial: left out, not undefined",
  summary:
    ".partial() accepts a field that is missing and also one set to undefined. .exactPartial() accepts only \"missing\": a key that is there must hold a real value, which keeps a half-built update from silently wiping a setting.",
  section: 'Objects',
  tags: ['.exactPartial', '.partial', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
