// Zod example: ~standard.validate on Zod, Zod Mini and a hand-made schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Black-box validation with Standard Schema',
  summary:
    'When a library only needs to run a schema as a black box, it can use the shared ~standard.validate interface that Zod implements. The same checking function is fed a Zod schema, a Zod Mini schema and a hand-written non-Zod schema, and reads the same shape of answer from each.',
  section: 'For library authors',
  tags: ['~standard', 'validate', 'vendor', 'Standard Schema', 'zod/mini'],
  docs: ['repo/packages/docs/content/library-authors.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
