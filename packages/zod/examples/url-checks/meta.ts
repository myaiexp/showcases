// Zod example: Is this a URL?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is this a URL?',
  summary:
    'z.url() asks the browser\'s own URL parser. That is permissive: a mailto link, a localhost address and even a javascript: link all pass, while a bare "example.com" does not.',
  section: 'Strings and formats',
  tags: ['z.url'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
