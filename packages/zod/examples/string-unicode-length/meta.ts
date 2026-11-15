// Zod example: Counting characters like a person
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Counting characters like a person',
  summary:
    'Zod counts Unicode code points, not the UTF-16 units JavaScript\'s .length counts: one emoji is one character even though .length says 2. Combining marks and joined emoji still count as several.',
  section: 'Strings and formats',
  tags: ['.length', 'unicode'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
