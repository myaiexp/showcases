// Zod example: Is it really a URL object, or just text?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is it really a URL object, or just text?',
  summary:
    'z.instanceof(Class) accepts only real instances of a class. A URL object passes and comes back as the very same object, while the text "https://example.com" and a Date are refused, even though both look right to a person.',
  section: 'Records, maps, sets and more',
  tags: ['z.instanceof', 'URL', 'Date', 'Error'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
