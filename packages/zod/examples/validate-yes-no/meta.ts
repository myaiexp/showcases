// Zod example: .validate() answers yes or no without building an error
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Just yes or no: .validate()',
  summary:
    'When you only need to know whether data is acceptable, .validate() returns true or false and never builds an error. The rows show its plain answers; the full view times it against safeParse().success over the same inputs.',
  section: 'Basic usage',
  tags: ['validate', 'z.validate', 'safeParse', 'performance'],
  docs: ['repo/packages/docs/content/basics.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
