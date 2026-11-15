// Zod example: Match a pattern
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Match a pattern',
  summary:
    'z.string().regex() accepts only text that matches a regular expression. Type a handle and see which characters break the rule; the message shows the pattern.',
  section: 'Strings and formats',
  tags: ['.regex'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
