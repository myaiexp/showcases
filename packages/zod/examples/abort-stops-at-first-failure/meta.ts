// Zod example: abort: stop at the first failed rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'abort: stop at the first failed rule',
  summary:
    "A password has three rules. By default Zod runs every rule and lists everything that is wrong. Mark each rule abort: true and validation stops at the first one that fails, so only one issue comes back.",
  section: 'Refinements',
  tags: ['refine', 'abort', 'issues'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
