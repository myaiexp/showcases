// Zod example: a safeParse error words its messages when first read
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Messages are written when first read',
  summary:
    'Since Zod 4.6 safeParse builds its error lazily, so a message is worded the first time you read it, in whatever language is configured at that moment. The same failed parse is shown read before and after a switch to French.',
  section: 'Release notes',
  tags: ['safeParse', 'z.config', 'z.locales', 'lazy error', 'localeError'],
  docs: ['repo/packages/docs/content/blog/zod-4-6.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
