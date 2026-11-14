// Zod example: exactOptional rejects an explicit undefined
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Absent is not the same as undefined',
  summary:
    "optional() allows a key to be left out or set to undefined. exactOptional() allows only leaving it out: a key that is present but undefined is rejected. This matches the TypeScript setting exactOptionalPropertyTypes.",
  section: 'Optional and nullable',
  tags: ['exactOptional', 'optional', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
