// Zod example: Four email patterns compared
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Four email patterns compared',
  summary:
    'z.email() takes a pattern option, and Zod ships four: the default, the browser\'s input[type=email], RFC 5322 and a Unicode-friendly one. The same eight addresses get different verdicts from each.',
  section: 'Strings and formats',
  tags: ['z.email', 'z.regexes'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
