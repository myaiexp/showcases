// Nested JSON validator example metadata for the zod package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Nested JSON validator',
  summary:
    'Edit the JSON and watch a nested schema validate in real time. Issues report a dotted path to the offending field, and a refine() cross-checks the total against the line items.',
  section: 'Basics',
  tags: ['object', 'array', 'refine', 'issues'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});
