// Zod example: Zod 3 issue codes next to the Zod 4 code each one became
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Issue codes that were merged',
  summary:
    'Four wrong values, each shown with what Zod 3 reported and the issue code Zod 4 reports now. A wrong enum option and a wrong literal both become invalid_value, a bad date becomes invalid_type, and Infinity, which Zod 3 let through as a number, is now rejected. Code that switches on issue.code needs these updates.',
  section: 'Release notes',
  tags: ['issue.code', 'invalid_value', 'invalid_type', 'z.enum', 'z.literal', 'zod/v3'],
  docs: ['repo/packages/docs/content/v4/changelog.mdx', 'repo/packages/docs/content/packages/core.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
