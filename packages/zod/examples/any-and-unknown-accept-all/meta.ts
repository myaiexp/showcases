// Zod example: any and unknown accept every value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.any() and z.unknown(): anything goes',
  summary:
    "Both schemas let every value through unchanged: text, null, undefined, NaN, even a function. They differ only for TypeScript, which treats the result as any or as unknown. Inside an object their key is still required unless you add optional().",
  section: 'Optional and nullable',
  tags: ['z.any', 'z.unknown', 'optional'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
