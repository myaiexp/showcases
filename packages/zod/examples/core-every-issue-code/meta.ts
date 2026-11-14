// Zod example: each Zod issue code triggered by a real parse
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Every issue code, triggered',
  summary:
    'Zod reports each problem as an issue with a code: invalid_type, too_big, too_small, invalid_format, not_multiple_of, unrecognized_keys, invalid_union, invalid_key, invalid_element, invalid_value and custom. Each row feeds one wrong value to a schema and shows the code that comes back.',
  section: 'Zod Core',
  tags: ['issue.code', 'invalid_type', 'too_big', 'too_small', 'invalid_format', 'not_multiple_of', 'unrecognized_keys', 'invalid_union', 'invalid_key', 'invalid_element', 'invalid_value', 'custom'],
  docs: ['repo/packages/docs/content/packages/core.mdx', 'repo/packages/docs/content/v4/changelog.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
