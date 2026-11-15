// Zod example: z.never rejects every input
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.never(): nothing gets through',
  summary:
    "z.never() has no valid value at all. Text, numbers, null, undefined and empty lists are all rejected with the same message. It is useful to mark a spot that must never be filled, such as a field that is not allowed to appear.",
  section: 'Optional and nullable',
  tags: ['z.never'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
