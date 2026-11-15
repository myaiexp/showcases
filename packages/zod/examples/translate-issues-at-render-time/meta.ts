// Zod example: Translate the issues after parsing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Translate the issues after parsing',
  summary:
    'The docs suggest an alternative to locales: parse once, then translate at render time, using the issue code as the key and the issue\'s other fields as the values. The same issues are drawn in four languages without parsing again.',
  section: 'Customizing errors',
  tags: ['issue.code', 'issues', 'translation', 'safeParse'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
