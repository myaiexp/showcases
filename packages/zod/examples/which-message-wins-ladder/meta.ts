// Zod example: Which message wins
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which message wins',
  summary:
    'Five places can word an error: the check, the schema, the parse call, a global error map and the locale. Switch them on and off and see the highest one still on win, using real parses of the same too-short text.',
  section: 'Customizing errors',
  tags: ['error precedence', 'safeParse', 'z.config', 'customError', 'z.locales'],
  docs: ['repo/packages/docs/content/error-customization.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
