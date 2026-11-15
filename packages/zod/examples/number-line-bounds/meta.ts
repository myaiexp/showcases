// Zod example: number bounds drawn as a lit-up number strip
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which numbers get in: gt, gte, lt, lte',
  summary:
    "A strip of whole numbers lights up the ones a schema accepts. z.number().gt(5) leaves 5 out, gte(5) lets it in, and lt and lte do the same from above. Pick a rule and slide a test value along the strip.",
  section: 'Numbers, dates and enums',
  tags: ['z.number', 'gt', 'gte', 'lt', 'lte'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
