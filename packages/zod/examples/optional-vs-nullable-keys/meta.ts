// Zod example: optional allows a missing key, nullable allows null
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A missing field is not a null field',
  summary:
    "In an object, an optional field may be left out or set to undefined, but null is rejected. A nullable field may hold null, but leaving it out is rejected. The output keeps exactly the keys the input had.",
  section: 'Optional and nullable',
  tags: ['z.object', 'optional', 'nullable'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
